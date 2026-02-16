import React from "react";
import CardSection from "../CardSection";
import type { FormState } from "../../lib/types";

export default function Cliente({
  value,
  onChange,
}: {
  value: FormState;
  onChange: (patch: Partial<FormState>) => void;
}) {
  return (
    <CardSection
      title="Datos del cliente"
      subtitle="A quién se le realiza el servicio"
      icon={<span className="font-black">👤</span>}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field
          label="Nombre completo"
          placeholder="Nombre del cliente"
          value={value.clientName}
          onChange={(v) => onChange({ clientName: v })}
          className="md:col-span-2"
        />
        <Field
          label="Teléfono / WhatsApp"
          placeholder="55 0000 0000"
          value={value.clientPhone}
          onChange={(v) => onChange({ clientPhone: v })}
        />
        <Field
          label="Email"
          placeholder="correo@ejemplo.com"
          value={value.clientEmail}
          onChange={(v) => onChange({ clientEmail: v })}
        />
        <Field
          label="Domicilio del servicio"
          placeholder="Calle, número, colonia, referencias"
          value={value.address}
          onChange={(v) => onChange({ address: v })}
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