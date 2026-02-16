import React from "react";
import CardSection from "../CardSection";
import type { FormState } from "../../lib/types";

export default function Profesionales({
  value,
  onChange,
}: {
  value: FormState;
  onChange: (patch: Partial<FormState>) => void;
}) {
  return (
    <CardSection
      title="Datos profesionales"
      subtitle="Información de tu empresa/servicio"
      icon={<span className="font-black">👷</span>}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field
          label="Nombre de la empresa / servicio"
          placeholder="Ej. Magníficos de la limpieza"
          value={value.company}
          onChange={(v) => onChange({ company: v })}
          className="md:col-span-2"
        />
        <Field
          label="Técnico responsable"
          placeholder="Ej. Juan Pérez"
          value={value.tech}
          onChange={(v) => onChange({ tech: v })}
        />
        <Field
          label="Teléfono de contacto"
          placeholder="55 1234 5678"
          value={value.phone}
          onChange={(v) => onChange({ phone: v })}
        />
        <Field
          label="Zona de cobertura"
          placeholder="Ciudad, Delegación, Zonas"
          value={value.coverage}
          onChange={(v) => onChange({ coverage: v })}
          className="md:col-span-2"
        />
      </div>
    </CardSection>
  );
}

function Field({
  label,
  placeholder,
  value,
  onChange,
  className,
}: {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="block text-xs font-extrabold text-slate-600 mb-2 uppercase tracking-wide">
        {label}
      </label>
      <input
        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-semibold text-slate-800 outline-none focus:ring-4 focus:ring-brand-100 focus:border-brand-400"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}