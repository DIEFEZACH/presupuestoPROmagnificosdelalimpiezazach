
import type { FormState } from "../../lib/types";

type Props = {
  value: FormState;
  onChange: (patch: Partial<FormState>) => void;
};

const DRYING_OPTIONS = [
  "4 a 6 horas (Natural)",
  "2 a 4 horas (Ventilación)",
  "1 a 2 horas (Ventilador)",
  "30 a 60 min (Secado rápido)",
] as const;

export default function Logistica({ value, onChange }: Props) {
  return (
    <section className="bg-white rounded-xl2 shadow-soft border border-slate-100 overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-3">
        <div className="h-9 w-9 rounded-xl bg-brand-100 text-brand-800 flex items-center justify-center font-black">
          3
        </div>
        <div>
          <h2 className="text-lg font-extrabold text-slate-800">Logística y observaciones</h2>
          <p className="text-sm font-semibold text-slate-500">
            Datos operativos del servicio y notas importantes
          </p>
        </div>
      </div>

      <div className="p-5 grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Observaciones */}
        <div className="lg:col-span-2">
          <label className="text-xs font-extrabold text-slate-600 uppercase tracking-wide">
            Observaciones del mueble (daños previos, zonas frágiles)
          </label>
          <textarea
            className="mt-2 w-full min-h-[120px] rounded-2xl border border-slate-200 bg-white px-4 py-3 font-semibold text-slate-800 outline-none focus:ring-4 focus:ring-brand-100 focus:border-brand-400"
            placeholder="Ej. El sofá tiene una rotura en la parte trasera..."
            value={value.notes}
            onChange={(e) => onChange({ notes: e.target.value })}
          />
        </div>

        {/* Tiempo de secado */}
        <div className="lg:col-span-1">
          <label className="text-xs font-extrabold text-slate-600 uppercase tracking-wide">
            Tiempo estimado de secado
          </label>

          <select
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 font-semibold text-slate-800 outline-none focus:ring-4 focus:ring-brand-100 focus:border-brand-400"
            value={value.drying}
            onChange={(e) => onChange({ drying: e.target.value })}
          >
            {DRYING_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>

          <div className="mt-3 rounded-2xl border border-slate-100 bg-slate-50 p-4">
            <div className="text-xs font-extrabold text-slate-600 uppercase tracking-wide">
              Tip rápido
            </div>
            <p className="mt-2 text-sm font-semibold text-slate-600">
              Recomienda ventilación y evitar usar el mueble hasta secado completo para mejores
              resultados.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}