import React from "react";
import CardSection from "../CardSection";
import type { FormState } from "../../lib/types";

const CONTEXT = [
  { id: "hogar", label: "Hogar", icon: "🏠" },
  { id: "mascotas", label: "Con mascotas", icon: "🐶" },
  { id: "oficina", label: "Oficina", icon: "🏢" },
  { id: "airbnb", label: "Airbnb / Renta", icon: "🧳" },
  { id: "cine", label: "Cine / Auditorio", icon: "🎬" },
  { id: "restaurante", label: "Restaurante", icon: "🍽️" },
  { id: "postobra", label: "Post-obra", icon: "🧱" },
  { id: "interior_auto", label: "Interior auto", icon: "🚗" },
  { id: "otro_ctx", label: "Otro", icon: "➕" },
] as const;

const CONDITIONS = [
  { id: "orina", label: "Orina", icon: "🐾" },
  { id: "comida_grasa", label: "Comida/Grasa", icon: "🍔" },
  { id: "vino_cafe", label: "Vino / Café", icon: "☕️" },
  { id: "sangre", label: "Sangre", icon: "🩸" },
  { id: "acaros", label: "Ácaros/Plaga", icon: "🕷️" },
  { id: "pelo_mascota", label: "Pelo mascota", icon: "🐕" },
  { id: "mal_olor", label: "Mal olor", icon: "🌬️" },
  { id: "moho_humedad", label: "Moho / Humedad", icon: "💧" },
  { id: "chicle", label: "Chicle/Pegamento", icon: "🧲" },
  { id: "tinta", label: "Tinta", icon: "🖊️" },
  { id: "otro_cond", label: "Otro (especificar)", icon: "✍️" },
] as const;

export default function ContextoCondiciones({
  value,
  onChange,
}: {
  value: FormState;
  onChange: (patch: Partial<FormState>) => void;
}) {
  const toggle = (arr: string[], id: string) =>
    arr.includes(id) ? arr.filter((x) => x !== id) : [...arr, id];

  return (
    <CardSection
      title="Contexto y condiciones detectadas"
      subtitle="Selecciona lo que aplica"
      icon={<span className="font-black">🏷️</span>}
    >
      <div className="space-y-6">
        {/* Contexto */}
        <div>
          <div className="text-xs font-extrabold text-slate-600 uppercase tracking-wide mb-3">
            Contexto y uso
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {CONTEXT.map((c) => (
              <ChipCard
                key={c.id}
                label={c.label}
                icon={c.icon}
                active={value.context.includes(c.id)}
                onClick={() => onChange({ context: toggle(value.context, c.id) })}
              />
            ))}
          </div>
        </div>

        {/* Condiciones */}
        <div>
          <div className="flex items-center gap-2 text-xs font-extrabold text-slate-600 uppercase tracking-wide mb-3">
            <span className="inline-block w-2 h-2 rounded-full bg-amber-500" />
            Manchas y condiciones detectadas
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {CONDITIONS.map((c) => (
              <Pill
                key={c.id}
                label={c.label}
                icon={c.icon}
                active={value.conditions.includes(c.id)}
                onClick={() => onChange({ conditions: toggle(value.conditions, c.id) })}
              />
            ))}
          </div>

          {/* Campo “otro (especificar)” */}
          {value.conditions.includes("otro_cond") ? (
            <div className="mt-3">
              <label className="block text-xs font-extrabold text-slate-600 mb-2 uppercase tracking-wide">
                Especifica (otro)
              </label>
              <input
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-semibold text-slate-800 outline-none focus:ring-4 focus:ring-brand-100 focus:border-brand-400"
                placeholder="Ej. Mancha de maquillaje, marcador, etc."
                value={(value as any).otherConditionText ?? ""}
                onChange={(e) => onChange({ ...(value as any), otherConditionText: e.target.value } as any)}
              />
            </div>
          ) : null}
        </div>
      </div>
    </CardSection>
  );
}

function ChipCard({
  label,
  icon,
  active,
  onClick,
}: {
  label: string;
  icon: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        "rounded-2xl border p-4 text-left transition shadow-sm " +
        (active
          ? "border-brand-300 bg-brand-50 ring-4 ring-brand-100"
          : "border-slate-200 bg-white hover:bg-slate-50")
      }
    >
      <div className="flex items-center justify-between">
        <div className="text-2xl">{icon}</div>
        <div
          className={
            "w-4 h-4 rounded border flex items-center justify-center " +
            (active ? "bg-brand-600 border-brand-600" : "bg-white border-slate-300")
          }
        >
          {active ? <span className="text-white text-xs font-black">✓</span> : null}
        </div>
      </div>
      <div className="mt-3 text-sm font-extrabold text-slate-800">{label}</div>
    </button>
  );
}

function Pill({
  label,
  icon,
  active,
  onClick,
}: {
  label: string;
  icon: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        "w-full rounded-2xl border px-4 py-3 flex items-center justify-between gap-3 transition " +
        (active
          ? "border-amber-300 bg-amber-50 ring-4 ring-amber-100"
          : "border-slate-200 bg-white hover:bg-slate-50")
      }
    >
      <div className="flex items-center gap-3">
        <div className="text-lg">{icon}</div>
        <div className="text-sm font-extrabold text-slate-800">{label}</div>
      </div>
      <div
        className={
          "w-4 h-4 rounded border flex items-center justify-center " +
          (active ? "bg-amber-500 border-amber-500" : "bg-white border-slate-300")
        }
      >
        {active ? <span className="text-white text-xs font-black">✓</span> : null}
      </div>
    </button>
  );
}