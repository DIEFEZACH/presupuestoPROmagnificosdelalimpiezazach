import React, { useMemo } from "react";
import CardSection from "../CardSection";
import type { Delicacy, FormState, SizeTier, Soil } from "../../lib/types";

const SOIL: Soil[] = ["Baja", "Media", "Alta"];
const DELICACY: Delicacy[] = ["Delicada", "Estándar", "Muy delicada"];
const SIZE: SizeTier[] = ["Chico", "Mediano", "Grande"];

export default function Diagnostico({
  value,
  onChange,
}: {
  value: FormState;
  onChange: (patch: Partial<FormState>) => void;
}) {
  const multiplier = useMemo(() => {
    const soilM = { Baja: 0.9, Media: 1.0, Alta: 1.2 } as const;
    const delM = { Delicada: 1.2, Estándar: 1.0, "Muy delicada": 1.35 } as const;
    const sizeM = { Chico: 0.9, Mediano: 1.0, Grande: 1.25 } as const;
    return soilM[value.soil] * delM[value.delicacy] * sizeM[value.sizeTier];
  }, [value.soil, value.delicacy, value.sizeTier]);

  return (
    <CardSection
      title="Inspección y diagnóstico"
      subtitle="Ajusta el precio según condición real"
      icon={<span className="font-black">🔎</span>}
      right={
        <div className="text-right">
          <div className="text-xs font-bold text-slate-500">Multiplicador</div>
          <div className="text-base font-black text-brand-800">{multiplier.toFixed(2)}x</div>
        </div>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Choice
          label="Nivel de suciedad"
          value={value.soil}
          options={SOIL}
          color="amber"
          onChange={(v) => onChange({ soil: v as Soil })}
        />
        <Choice
          label="Delicadeza / antigüedad"
          value={value.delicacy}
          options={DELICACY}
          color="blue"
          onChange={(v) => onChange({ delicacy: v as Delicacy })}
        />
        <Choice
          label="Tamaño / plazas"
          value={value.sizeTier}
          options={SIZE}
          color="emerald"
          onChange={(v) => onChange({ sizeTier: v as SizeTier })}
        />
      </div>
    </CardSection>
  );
}

function Choice({
  label,
  value,
  options,
  onChange,
  color,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
  color: "amber" | "blue" | "emerald";
}) {
  const ring =
    color === "amber"
      ? "focus:ring-amber-200 focus:border-amber-400"
      : color === "blue"
      ? "focus:ring-blue-200 focus:border-blue-400"
      : "focus:ring-emerald-200 focus:border-emerald-400";

  const badge =
    color === "amber"
      ? "bg-amber-100 text-amber-700"
      : color === "blue"
      ? "bg-blue-100 text-blue-700"
      : "bg-emerald-100 text-emerald-700";

  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="text-xs font-extrabold text-slate-600 uppercase tracking-wide">{label}</div>
        <div className={"text-xs font-black px-3 py-1 rounded-full " + badge}>{value}</div>
      </div>

      <select
        className={"w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 font-semibold text-slate-800 outline-none focus:ring-4 " + ring}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}