import { useMemo, useRef } from "react";
import Header from "./components/Header";
import { useLocalStorageState } from "./lib/useLocalStorageState";
import type { FormState } from "./lib/types";
import { mxn } from "./lib/utils";
import { exportNodeToPdf } from "./lib/pdf";
import PdfResumen from "./components/pdf/PdfResumen";

import Profesionales from "./components/sections/Profesionales";
import Cliente from "./components/sections/Cliente";
import MuebleArea from "./components/sections/MuebleArea";
import Diagnostico from "./components/sections/Diagnostico";
import ContextoCondiciones from "./components/sections/ContextoCondiciones";
import Servicios from "./components/sections/Servicios";
import Extras from "./components/sections/Extras";
import Logistica from "./components/sections/Logistica";

const initialState: FormState = {
  company: "",
  tech: "",
  phone: "",
  coverage: "",

  clientName: "",
  clientPhone: "",
  clientEmail: "",
  address: "",

  mainType: "",
  material: "",
  color: "",
  room: "",
  urgency: "Normal",

  soil: "Media",
  delicacy: "Estándar",
  sizeTier: "Mediano",

  context: [],
  conditions: [],

  selectedServices: {},
  servicesTotal: 0,
  extras: [],

  date: "",
  time: "",
  duration: 2,
  drying: "4 a 6 horas (Natural)",
  notes: "",

  deposit: 0,
  logoDataUrl: null,
};

export default function App() {
  const pdfRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useLocalStorageState<FormState>(
    "magnificos_presupuesto_v1",
    initialState
  );

  // ✅ Total manual de servicios (lo capturas en Servicios.tsx)
  const servicesManualTotal = useMemo(
    () => Number(form.servicesTotal) || 0,
    [form.servicesTotal]
  );

  const extrasTotal = useMemo(
    () =>
      form.extras.reduce(
        (sum, e) => sum + (Number(e.qty) || 0) * (Number(e.unit) || 0),
        0
      ),
    [form.extras]
  );

  const grandTotal = servicesManualTotal + extrasTotal;
  const pending = Math.max(0, grandTotal - (Number(form.deposit) || 0));

  return (
    <div className="min-h-screen bg-brand-50">
      <Header
        logoDataUrl={form.logoDataUrl}
        onLogoChange={(logoDataUrl) => setForm({ ...form, logoDataUrl })}
      />

      <main className="mx-auto max-w-6xl px-5 py-8 space-y-6">
        <div className="space-y-6">
          <Profesionales value={form} onChange={(patch) => setForm({ ...form, ...patch })} />
          <Cliente value={form} onChange={(patch) => setForm({ ...form, ...patch })} />
          <MuebleArea value={form} onChange={(patch) => setForm({ ...form, ...patch })} />
          <Diagnostico value={form} onChange={(patch) => setForm({ ...form, ...patch })} />
          <ContextoCondiciones value={form} onChange={(patch) => setForm({ ...form, ...patch })} />
          <Servicios value={form} onChange={(patch) => setForm({ ...form, ...patch })} />
          <Extras value={form} onChange={(patch) => setForm({ ...form, ...patch })} />
          <Logistica value={form} onChange={(patch) => setForm({ ...form, ...patch })} />

          {/* Resumen */}
          <section className="bg-white rounded-xl2 shadow-soft border border-slate-100 overflow-hidden">
            <div className="px-6 py-6 border-b border-slate-100">
              <h2 className="text-xl font-extrabold text-slate-800">Resumen financiero</h2>
            </div>

            {/* Cards */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
                <div className="text-sm font-bold text-slate-600">Servicios de Limpieza</div>
                <div className="text-3xl font-black text-brand-800 mt-1">
                  {mxn(servicesManualTotal)}
                </div>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
                <div className="text-sm font-bold text-slate-600">Extras / Cargos</div>
                <div className="text-3xl font-black text-brand-800 mt-1">
                  {mxn(extrasTotal)}
                </div>
              </div>
            </div>

            {/* Gran total + Anticipo + Saldo */}
            <div className="px-6 pb-6">
              <div className="rounded-2xl bg-gradient-to-r from-brand-800 to-brand-600 text-white p-6 shadow-soft">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                  <div>
                    <div className="text-xs font-extrabold uppercase tracking-wide opacity-90">
                      Gran total
                    </div>
                    <div className="text-4xl font-black mt-1">{mxn(grandTotal)}</div>
                  </div>

                  <div>
                    <div className="text-xs font-extrabold uppercase tracking-wide opacity-90">
                      Anticipo / Reserva
                    </div>

                    <div className="mt-2 flex items-center gap-2">
                      <input
                        type="number"
                        min={0}
                        className="w-full rounded-2xl bg-white/15 border border-white/25 px-4 py-3 font-black text-white outline-none focus:ring-4 focus:ring-white/20"
                        value={form.deposit || 0}
                        onChange={(e) => setForm({ ...form, deposit: Number(e.target.value) })}
                        placeholder="0"
                      />
                    </div>

                    <div className="mt-2 text-xs font-semibold opacity-90">
                      Se descuenta del total para calcular saldo.
                    </div>
                  </div>

                  <div className="md:text-right">
                    <div className="text-xs font-extrabold uppercase tracking-wide opacity-90">
                      Saldo pendiente
                    </div>
                    <div className="text-4xl font-black mt-1">{mxn(pending)}</div>
                  </div>
                </div>
              </div>

              {/* Botones */}
              <div className="mt-5 flex flex-col md:flex-row gap-3">
                <button
                  className="flex-1 rounded-2xl bg-brand-600 text-white font-extrabold px-5 py-4 shadow-soft hover:bg-brand-800 transition"
                  onClick={async () => {
                    if (!pdfRef.current) return;
                    await exportNodeToPdf(pdfRef.current, "Presupuesto_cliente.pdf");
                  }}
                >
                  Generar presupuesto
                </button>

                <button
                  className="rounded-2xl border-2 border-red-200 text-red-700 font-extrabold px-5 py-4 hover:bg-red-50 transition"
                  onClick={() =>
                    setForm({
                      ...form,
                      company: "",
                      tech: "",
                      phone: "",
                      coverage: "",
                    })
                  }
                >
                  Borrar datos profesionales
                </button>

                <button
                  className="rounded-2xl bg-slate-800 text-white font-extrabold px-5 py-4 hover:bg-slate-900 transition"
                  onClick={() => setForm(initialState)}
                >
                  Reiniciar formulario
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>
    <div style={{ position: "fixed", left: -99999, top: 0 }}>
      <div ref={pdfRef} className="w-[794px] bg-white">
        <PdfResumen form={form} servicesTotal={servicesManualTotal} extrasTotal={extrasTotal} />
      </div>
    </div>
    </div>
  );
}