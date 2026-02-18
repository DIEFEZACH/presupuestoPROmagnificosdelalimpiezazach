import CardSection from "../CardSection";
import type { FormState } from "../../lib/types";
import { normalizeUrl } from "../../lib/normalizeUrl";

export default function Cliente({
  value,
  onChange,
}: {
  value: FormState;
  onChange: (patch: Partial<FormState>) => void;
}) {
  const mapsUrl = value.addressMapUrl ?? "";
  const safeMapsUrl = normalizeUrl(mapsUrl);

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

        {/* ✅ Nuevo: link de Google Maps (va DESPUÉS de domicilio) */}
        <div className="md:col-span-2">
          <label className="block text-xs font-extrabold text-slate-600 mb-2 uppercase tracking-wide">
            Dirección (Google Maps link)
          </label>

          <input
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-semibold text-slate-800 outline-none focus:ring-4 focus:ring-brand-100 focus:border-brand-400"
            placeholder="Pega aquí el link de Google Maps"
            value={mapsUrl}
            onChange={(e) =>
              onChange({ addressMapUrl: normalizeUrl(e.target.value) })
            }
          />

          {safeMapsUrl ? (
            <a
              href={safeMapsUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex mt-3 items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 font-extrabold text-sm text-brand-700 hover:bg-slate-50"
            >
              📍 Abrir en Google Maps
            </a>
          ) : (
            <div className="mt-2 text-xs font-semibold text-slate-500">
              Tip: abre Google Maps, comparte la ubicación y pega el enlace aquí.
            </div>
          )}
        </div>
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