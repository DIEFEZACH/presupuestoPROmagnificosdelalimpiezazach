import CardSection from "../CardSection";
import type { FormState, Urgency } from "../../lib/types";

const MAIN_TYPES = [
  // ===== Salas (tela / piel)
  "Sala 3-2-1 S/C",
  "Sala 3-2-1 c/6 coj.",
  "Sala en L (Esq.)",
  "Sala Modular",
  "Plaza extra",
  "Taburete",
  "Futón",
  "Sofá individual",
  "Love seat",
  "Sofá 3 personas",
  "Sofá 4 personas",
  "Sofá diván",
  "Cojín deco",
  "Cojín mediano",
  "Cojín grande (asiento/respaldo)",
  "Cojín gigante",
  "Sofá cama individual",
  "Sofá cama matrimonial",
  "Sofá cama Queen Size",
  "Sofá cama King Size",
  "Sofá cama c/colchoneta",
  "Cabecera individual",
  "Cabecera matrimonial",
  "Cabecera Queen Size",
  "Cabecera King Size",

  // ===== Colchones y accesorios
  "Colchón cuna",
  "Colchón individual",
  "Colchón matrimonial",
  "Colchón Queen Size",
  "Colchón King Size",
  "Box spring individual",
  "Box spring matrimonial",
  "Box spring Queen/King",
  "Carriola chica tijera",
  "Carriola mediana",
  "Carriola grande",
  "Portabebé p/auto",
  "Portabebé",

  // ===== Sillas y sillones
  "Sillas (solo asiento)",
  "Sillas asiento y respaldo",
  "Sillas forradas",
  "Silla secretarial",
  "Silla Bergère",
  "Reposet sencillo",
  "Reposet eléctrico",
  "Sillón ejecutivo",

  // ===== Telas
  "Cortinas por hoja",
  "Tela en muro",
  "Mampara",
  "Tapete pelo corto sintético",
  "Tapete pelo largo sintético",
  "Tapete pelo natural",

  // ===== Autos y camionetas (tela / piel)
  "Solo asientos (auto)",
  "Asientos y alfombra (auto)",
  "Auto completo",
  "Camioneta 7p – solo asientos",
  "Camioneta 7p – asientos y alfombra",
  "Camioneta 7p – completa",
  "Camioneta grande",

  // ===== Pisos y superficies especiales
  "Alfombra uso rudo (≤100 m²)",
  "Alfombra uso rudo (>100 m²)",
  "Alfombra residencial (≤100 m²)",
  "Alfombra residencial (>100 m²)",
  "Pulido de cubierta de mármol",
  "Pulido de mosaico / vitropiso",
  "Sólo aplicación de sello",
  "Pulido y sello de mosaico",
  "Pulido y encerado de mosaico",
  "Pulido mármol/terrazo/granito (≤100 m²)",
  "Pulido mármol/terrazo/granito (>100 m²)",
  "Lavado de cemento (≤100 m²)",
  "Oxidado de cemento (≤100 m²)",

  // ===== Extras / Paquetes / Alcances
  "Sanitización con nebulización (≤100 m²)",
  "Renta de cuadrilla (8 h, 2 elementos, jarcería, químicos y maquinaria)",
  "Hora adicional de cuadrilla",
  "PAQUETE BÁSICO",
  "PAQUETE GOLDEN",
  "PAQUETE GOLDEN PREMIUM",
  "LIMPIEZA PIEL",
  "LIMPIEZA E HIDRATACIÓN PIEL",

  // ===== Otros
  "Otro",
] as const;

const urgencyToValue: Record<Urgency, number> = { Baja: 0, Normal: 50, Alta: 100 };
const valueToUrgency = (v: number): Urgency => (v < 34 ? "Baja" : v < 67 ? "Normal" : "Alta");

export default function MuebleArea({
  value,
  onChange,
}: {
  value: FormState;
  onChange: (patch: Partial<FormState>) => void;
}) {
  const sliderValue = urgencyToValue[value.urgency];

  return (
    <CardSection
      title="Datos del mueble / área"
      subtitle="Qué se va a limpiar y dónde está"
      icon={<span className="font-black">🛋️</span>}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-1">
          <label className="block text-xs font-extrabold text-slate-600 mb-2 uppercase tracking-wide">
            Tipo de mueble principal
          </label>
          <select
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-semibold text-slate-800 outline-none focus:ring-4 focus:ring-brand-100 focus:border-brand-400"
            value={value.mainType}
            onChange={(e) => onChange({ mainType: e.target.value })}
          >
            <option value="">Seleccione Mueble...</option>
            {MAIN_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <Field
          label="Material / textura"
          placeholder="Ej. Tela lino, gamuza, piel"
          value={value.material}
          onChange={(v) => onChange({ material: v })}
        />
        <Field
          label="Color"
          placeholder="Ej. Gris Oxford"
          value={value.color}
          onChange={(v) => onChange({ color: v })}
        />
        <Field
          label="Ubicación / habitación"
          placeholder="Ej. Sala principal, recámara"
          value={value.room}
          onChange={(v) => onChange({ room: v })}
        />

        <div className="md:col-span-2">
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs font-extrabold text-slate-600 uppercase tracking-wide">
              Nivel de urgencia
            </label>
            <span
              className={
                "text-xs font-black px-3 py-1 rounded-full " +
                (value.urgency === "Alta"
                  ? "bg-red-100 text-red-700"
                  : value.urgency === "Baja"
                  ? "bg-slate-100 text-slate-700"
                  : "bg-emerald-100 text-emerald-700")
              }
            >
              {value.urgency.toUpperCase()}
            </span>
          </div>

          <input
            type="range"
            min={0}
            max={100}
            value={sliderValue}
            onChange={(e) => onChange({ urgency: valueToUrgency(Number(e.target.value)) })}
            className="w-full accent-brand-600"
          />

          <div className="mt-2 grid grid-cols-3 text-xs font-bold text-slate-500">
            <span>BAJA</span>
            <span className="text-center">NORMAL</span>
            <span className="text-right">ALTA</span>
          </div>
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