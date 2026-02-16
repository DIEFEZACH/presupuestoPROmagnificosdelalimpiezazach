import React from "react";
import CardSection from "../CardSection";
import type { FormState } from "../../lib/types";

type ExtraItem = { id: string; concept: string; qty: number; unit: number };

export default function Extras({
  value,
  onChange,
}: {
  value: FormState;
  onChange: (patch: Partial<FormState>) => void;
}) {
  const extras: ExtraItem[] = (value as any).extras ?? [];

  const setExtras = (next: ExtraItem[]) => onChange({ ...(value as any), extras: next } as any);

  const addRow = () => {
    setExtras([
      ...extras,
      { id: crypto.randomUUID(), concept: "", qty: 1, unit: 0 },
    ]);
  };

  const update = (id: string, patch: Partial<ExtraItem>) => {
    setExtras(extras.map((x) => (x.id === id ? { ...x, ...patch } : x)));
  };

  const remove = (id: string) => setExtras(extras.filter((x) => x.id !== id));

  const total = extras.reduce((acc, x) => acc + (Number(x.qty) || 0) * (Number(x.unit) || 0), 0);

  return (
    <CardSection
      title="2. Extras y productos"
      subtitle="Agrega cargos extra (ej. estacionamiento, carga piso difícil) o productos"
      icon={<span className="font-black">🧾</span>}
      right={
        <div className="text-right">
          <div className="text-xs font-bold text-slate-500">Extras</div>
          <div className="text-base font-black text-brand-800">{money(total)}</div>
        </div>
      }
    >
      <div className="space-y-3">
        <div className="hidden md:grid md:grid-cols-12 gap-3 text-xs font-extrabold text-slate-500 uppercase tracking-wide px-2">
          <div className="md:col-span-6">Concepto / producto</div>
          <div className="md:col-span-2">Cant.</div>
          <div className="md:col-span-2">Costo u.</div>
          <div className="md:col-span-2">Total</div>
        </div>

        {extras.map((row) => {
          const rowTotal = (Number(row.qty) || 0) * (Number(row.unit) || 0);

          return (
            <div key={row.id} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center rounded-2xl border border-slate-200 bg-white p-3">
              <div className="md:col-span-6">
                <input
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-semibold text-slate-800 outline-none focus:ring-4 focus:ring-brand-100 focus:border-brand-400"
                  placeholder="Ej. Cargo piso extra (sin elevador)"
                  value={row.concept}
                  onChange={(e) => update(row.id, { concept: e.target.value })}
                />
              </div>

              <div className="md:col-span-2">
                <input
                  type="number"
                  min={1}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-semibold text-slate-800 outline-none focus:ring-4 focus:ring-brand-100 focus:border-brand-400"
                  value={row.qty}
                  onChange={(e) => update(row.id, { qty: Number(e.target.value) })}
                />
              </div>

              <div className="md:col-span-2">
                <input
                  type="number"
                  min={0}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-semibold text-slate-800 outline-none focus:ring-4 focus:ring-brand-100 focus:border-brand-400"
                  value={row.unit}
                  onChange={(e) => update(row.id, { unit: Number(e.target.value) })}
                />
              </div>

              <div className="md:col-span-2 flex items-center justify-between gap-3">
                <div className="font-black text-slate-800">{money(rowTotal)}</div>
                <button
                  type="button"
                  onClick={() => remove(row.id)}
                  className="w-10 h-10 rounded-2xl border border-rose-200 bg-rose-50 text-rose-600 font-black hover:bg-rose-100"
                  title="Eliminar"
                >
                  🗑
                </button>
              </div>
            </div>
          );
        })}

        <button
          type="button"
          onClick={addRow}
          className="w-full rounded-2xl px-5 py-4 bg-brand-600 text-white font-extrabold hover:bg-brand-700 transition shadow-soft"
        >
          + Añadir extra / producto
        </button>

        <div className="flex items-center justify-end">
          <div className="text-sm font-extrabold text-slate-700">
            Total extras: <span className="text-brand-800">{money(total)}</span>
          </div>
        </div>
      </div>
    </CardSection>
  );
}

function money(n: number) {
  return n.toLocaleString("es-MX", { style: "currency", currency: "MXN" });
}