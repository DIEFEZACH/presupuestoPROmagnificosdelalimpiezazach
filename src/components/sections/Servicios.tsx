import { useMemo } from "react";
import CardSection from "../CardSection";
import type { FormState } from "../../lib/types";
import { SERVICE_CATALOG } from "../../lib/servicesCatalog";

type SelectedMap = Record<string, number>; // id -> qty

// Tipos para el catálogo (quita readonly / unknown)
type CatalogItem = { id: string; label: string; tag?: string };
type CatalogCategory = { id: string; title: string; items: CatalogItem[] };

type SelectedRow = { id: string; qty: number; label: string; tag?: string };

export default function Servicios({
  value,
  onChange,
}: {
  value: FormState;
  onChange: (patch: Partial<FormState>) => void;
}) {
  const selected: SelectedMap = (value as any).selectedServices ?? {};

  const setQty = (id: string, qty: number) => {
    const next: SelectedMap = { ...selected };
    if (qty <= 0) delete next[id];
    else next[id] = qty;

    // ✅ Solo manda el patch, no todo value
    onChange({ selectedServices: next } as any);
  };

  const toggle = (id: string) => setQty(id, selected[id] ? 0 : 1);

  const selectedList: SelectedRow[] = useMemo(() => {
    // ✅ casteamos el catálogo para evitar readonly/unknown
    const catalog = SERVICE_CATALOG as unknown as CatalogCategory[];
    const all: CatalogItem[] = catalog.flatMap((c) => c.items);

    // ✅ tipamos Object.entries para que qty sea number
    const entries = Object.entries(selected) as Array<[string, number]>;

    return entries
      .map(([id, qty]) => {
        const item = all.find((x: CatalogItem) => x.id === id);
        return item ? ({ id, qty, label: item.label, tag: item.tag } as SelectedRow) : null;
      })
      .filter((x): x is SelectedRow => Boolean(x));
  }, [selected]);

  // ✅ igual casteo para que TS no se queje en map
  const catalog = SERVICE_CATALOG as unknown as CatalogCategory[];

  return (
    <CardSection
      title="1. Selección de servicios"
      subtitle="Selecciona los servicios a incluir en el presupuesto"
      icon={<span className="font-black">🧼</span>}
      right={
        <div className="text-right">
          <div className="text-xs font-bold text-slate-500">Servicios</div>
          <div className="text-base font-black text-brand-800">{money(value.servicesTotal || 0)}</div>
        </div>
      }
    >
      <div className="space-y-6">
        {catalog.map((cat) => (
          <div key={cat.id}>
            <div className="flex items-center gap-2 mb-3">
              <div className="text-sm font-extrabold text-slate-800">{cat.title}</div>
              <div className="flex-1 border-t border-dashed border-slate-200" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              {cat.items.map((it) => {
                const qty = selected[it.id] ?? 0;
                const active = qty > 0;

                return (
                  <button
                    key={it.id}
                    type="button"
                    onClick={() => toggle(it.id)}
                    className={
                      "relative rounded-2xl px-4 py-3 border text-left transition " +
                      (active
                        ? "bg-brand-600 border-brand-600 text-white shadow-soft"
                        : "bg-white border-slate-200 text-slate-800 hover:bg-slate-50")
                    }
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="text-sm font-extrabold">{it.label}</div>
                        <div
                          className={
                            "mt-1 text-xs font-bold " + (active ? "text-white/85" : "text-slate-500")
                          }
                        >
                          {it.tag ? `Unidad: ${it.tag}` : "Servicio incluido"}
                        </div>
                      </div>

                      <div
                        className={
                          "w-5 h-5 rounded-full flex items-center justify-center border " +
                          (active ? "bg-white/15 border-white/30" : "bg-white border-slate-300")
                        }
                      >
                        {active ? <span className="text-xs font-black">✓</span> : null}
                      </div>
                    </div>

                    {active ? (
                      <div className="mt-3 flex items-center justify-between gap-2">
                        <div className="text-xs font-black uppercase tracking-wide text-white/85">
                          Cant.
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setQty(it.id, Math.max(0, qty - 1));
                            }}
                            className="w-8 h-8 rounded-xl bg-white/15 hover:bg-white/25 border border-white/20 font-black"
                          >
                            -
                          </button>
                          <div className="w-10 text-center font-black">{qty}</div>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setQty(it.id, qty + 1);
                            }}
                            className="w-8 h-8 rounded-xl bg-white/15 hover:bg-white/25 border border-white/20 font-black"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ) : null}
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {/* Desglose + total manual */}
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <div className="text-xs font-extrabold text-slate-600 uppercase tracking-wide mb-2">
            Desglose de servicios seleccionados
          </div>

          {selectedList.length === 0 ? (
            <div className="text-sm font-semibold text-slate-500">Ningún servicio seleccionado…</div>
          ) : (
            <ul className="text-sm font-semibold text-slate-700 space-y-1">
              {selectedList.map((s) => (
                <li key={s.id} className="flex items-center justify-between gap-3">
                  <span className="min-w-0">
                    {s.label} <span className="text-slate-400">x{s.qty}</span>
                  </span>
                  <span className="text-xs font-bold text-slate-500 whitespace-nowrap">
                    {s.tag ?? ""}
                  </span>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-4 grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-3 items-start">
            <div>
              <div className="text-xs font-extrabold text-slate-600 uppercase tracking-wide mb-2">
                Precio total del paquete (manual)
              </div>

              <input
                type="number"
                min={0}
                inputMode="numeric"
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base font-semibold text-slate-800 outline-none focus:ring-4 focus:ring-brand-100 focus:border-brand-400"
                value={value.servicesTotal === 0 ? "" : value.servicesTotal}
                onChange={(e) => onChange({ servicesTotal: Number(e.target.value) })}
                placeholder="Ej. 1800"
              />

              <div className="mt-2 text-xs font-semibold text-slate-500">
                Tip: aquí aplicas variación por región, material, condición, etc.
              </div>
            </div>

            <div>
              <div className="text-xs font-extrabold text-slate-600 uppercase tracking-wide mb-2">
                Total servicios
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-right">
                <div className="text-lg font-black text-brand-800">
                  {money(value.servicesTotal || 0)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CardSection>
  );
}

function money(n: number) {
  return n.toLocaleString("es-MX", { style: "currency", currency: "MXN" });
}