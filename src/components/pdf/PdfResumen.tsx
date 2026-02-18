import type { ReactNode } from "react";
import type { FormState, DocType } from "../../lib/types";
import { mxn } from "../../lib/utils";
import { SERVICES } from "../../lib/services";

const WATERMARK_URL =
  "https://res.cloudinary.com/diefezach/image/upload/v1771389563/fondo_pshb2i.png";

export default function PdfResumen({
  form,
  servicesTotal,
  extrasTotal,
  docType,
}: {
  form: FormState;
  servicesTotal: number;
  extrasTotal: number;
  docType: DocType;
}) {
  const selected = SERVICES.filter((s) => (form.selectedServices?.[s.id] ?? 0) > 0);

  const grandTotal = servicesTotal + extrasTotal;
  const deposit = Number(form.deposit) || 0;
  const pending = Math.max(0, grandTotal - deposit);

  const fecha = new Date();
  const fechaTxt = fecha.toLocaleDateString("es-MX");
  const horaTxt = fecha.toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" });

  const timePretty = form.time
    ? new Date(`1970-01-01T${form.time}:00`).toLocaleTimeString("es-MX", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
    : "--";

  return (
    <div
      id="pdf-root"
      style={{
        width: "794px", // A4 aprox a 96dpi
        minHeight: "1123px",
        background: "#fff",
        padding: "34px",
        boxSizing: "border-box",
        position: "relative", // ✅ para marca de agua
        overflow: "hidden",
        fontFamily:
          'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial',
      }}
    >
      {/* ✅ Marca de agua (PNG) */}
      <img
        src={WATERMARK_URL}
        crossOrigin="anonymous"
        alt=""
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "contain",
          opacity: 0.05, // 5% (baja a 0.03 si quieres)
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* ✅ Todo el contenido arriba */}
      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Header (refleja el de la app) */}
        <div style={{ display: "flex", justifyContent: "space-between", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            {form.logoDataUrl ? (
              <img
                src={form.logoDataUrl}
                alt="logo"
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 14,
                  objectFit: "contain",
                  padding: 8,
                  background: "rgba(255,255,255,0.14)",
                  border: "1px solid rgba(255,255,255,0.22)",
                }}
              />
            ) : (
              <div
                style={{
                  width: 62,
                  height: 62,
                  borderRadius: 14,
                  background: "#EEF2FF",
                }}
              />
            )}

            <div>
              <div style={{ fontSize: 26, fontWeight: 900, color: "#1f2a44" }}>{docType}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#5b6b85" }}>
                Lavado de tapicería y alfombras
              </div>
            </div>
          </div>

          <div style={{ textAlign: "right", fontSize: 12, color: "#334155", fontWeight: 800 }}>
            <div>FECHA: {fechaTxt}</div>
            <div>HORA: {horaTxt}</div>
          </div>
        </div>

        <div style={{ height: 6, background: "#2b7fff", borderRadius: 999, marginTop: 18 }} />

        {/* ✅ DATOS PROFESIONALES */}
        <div style={{ marginTop: 16 }}>
          <Card title="DATOS PROFESIONALES">
            <Line label="Empresa / Servicio" value={form.company || "No especificado"} />
            <Line label="Técnico responsable" value={form.tech || "No especificado"} />
            <Line label="Teléfono de contacto" value={form.phone || "--"} />
            <Line label="Zona de cobertura" value={form.coverage || "--"} />
          </Card>
        </div>

        {/* 2 cards */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 16 }}>
          <Card title="DATOS DEL CLIENTE">
            <Line label="Día del servicio" value={form.date || "--"} />
            <Line label="Horario" value={timePretty} />
            <Line label="Nombre" value={form.clientName || "No especificado"} />
            <Line label="WhatsApp" value={form.clientPhone || "--"} />
            <Line label="Email" value={form.clientEmail || "--"} />
            <Line label="Domicilio" value={form.address || "--"} />

            {/* ✅ Link clickeable por el paso de export (data-pdf-link="map") */}
            <div style={{ fontSize: 12.5, color: "#0f172a", marginTop: 2 }}>
              <span style={{ fontWeight: 900 }}>Mapa:</span>{" "}
              {form.addressMapUrl?.trim() ? (
                <span
                  data-pdf-link="map"
                  style={{ fontWeight: 800, color: "#2563EB", textDecoration: "underline" }}
                >
                  Ver ubicación en Google Maps
                </span>
              ) : (
                <span style={{ fontWeight: 600 }}>--</span>
              )}
            </div>
          </Card>

          <Card title="DETALLES DEL SERVICIO">
            <Line label="Mueble/Área" value={form.mainType || "No especificado"} />
            <Line label="Material" value={form.material || "--"} />
            <Line label="Color" value={form.color || "--"} />
            <Line label="Ubicación" value={form.room || "--"} />
            <Line label="Urgencia" value={form.urgency} />
          </Card>
        </div>

        {/* Diagnóstico */}
        <div style={{ marginTop: 16 }}>
          <Card title="DIAGNÓSTICO INICIAL">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <Line label="Nivel de suciedad" value={`${form.soil}`} />
              <Line label="Tamaño/Plazas" value={`${form.sizeTier}`} />
              <Line label="Delicadeza/Tipo" value={`${form.delicacy}`} />
              <Line
                label="Contexto"
                value={form.context?.length ? form.context.join(", ") : "Ninguno / No especificado"}
              />
              <Line
                label="Manchas/Condiciones"
                value={
                  form.conditions?.length
                    ? form.conditions.join(", ")
                    : "Ninguno / No especificado"
                }
              />
            </div>
          </Card>
        </div>

        {/* Servicios */}
        <div style={{ marginTop: 16 }}>
          <div
            style={{
              background: "#1f7a6b",
              color: "white",
              fontWeight: 900,
              padding: "10px 14px",
              borderRadius: 12,
              fontSize: 13,
              letterSpacing: 0.3,
            }}
          >
            DESGLOSE DE SERVICIOS
          </div>

          <div
            style={{
              border: "1px solid #E2E8F0",
              borderRadius: 14,
              padding: 14,
              marginTop: 10,
            }}
          >
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {selected.length ? (
                selected.map((s) => (
                  <div key={s.id} style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <span
                      style={{
                        width: 18,
                        height: 18,
                        borderRadius: 999,
                        background: "#10B981",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        fontSize: 12,
                        fontWeight: 900,
                        flex: "0 0 auto",
                      }}
                    >
                      ✓
                    </span>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#0f172a" }}>{s.name}</div>
                  </div>
                ))
              ) : (
                <div style={{ color: "#64748B", fontWeight: 700 }}>Sin servicios seleccionados.</div>
              )}
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 12 }}>
              <div style={{ fontWeight: 900, color: "#0f766e" }}>
                IMPORTE SERVICIOS: {mxn(servicesTotal)}
              </div>
            </div>
          </div>
        </div>

        {/* Observaciones + Totales */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 18 }}>
          <Card title="LOGÍSTICA Y OBSERVACIONES">
            <Line label="Tiempo estim. secado" value={form.drying} />
            <div style={{ marginTop: 8, fontSize: 12, color: "#334155" }}>
              <b>Notas:</b> {form.notes || "—"}
            </div>

            {/* ✅ Evidencia Antes / Después (se imprime en PDF) */}
            <div style={{ marginTop: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 900, color: "#334155", marginBottom: 6 }}>
                EVIDENCIA (ANTES / DESPUÉS)
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 900, color: "#64748B", marginBottom: 4 }}>
                    Antes
                  </div>
                  {form.beforePhoto ? (
                    <img
                      src={form.beforePhoto}
                      alt="Antes"
                      style={{
                        width: "100%",
                        height: 140,
                        objectFit: "cover",
                        borderRadius: 10,
                        border: "1px solid #E2E8F0",
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        height: 140,
                        borderRadius: 10,
                        border: "1px dashed #CBD5E1",
                        background: "#F8FAFC",
                      }}
                    />
                  )}
                </div>

                <div>
                  <div style={{ fontSize: 10, fontWeight: 900, color: "#64748B", marginBottom: 4 }}>
                    Después
                  </div>
                  {form.afterPhoto ? (
                    <img
                      src={form.afterPhoto}
                      alt="Después"
                      style={{
                        width: "100%",
                        height: 140,
                        objectFit: "cover",
                        borderRadius: 10,
                        border: "1px solid #E2E8F0",
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        height: 140,
                        borderRadius: 10,
                        border: "1px dashed #CBD5E1",
                        background: "#F8FAFC",
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          </Card>

          <Card title="TOTALES">
            <Line label="Subtotal Servicios" value={mxn(servicesTotal)} />
            <Line label="Subtotal Extras" value={mxn(extrasTotal)} />
            <div style={{ height: 1, background: "#E2E8F0", margin: "10px 0" }} />
            <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 900 }}>
              <div style={{ fontSize: 16 }}>TOTAL PROYECTO:</div>
              <div style={{ fontSize: 18, color: "#0f766e" }}>{mxn(grandTotal)}</div>
            </div>
            <div style={{ marginTop: 8, fontSize: 12 }}>
              (-) Anticipo: <b>{mxn(deposit)}</b>
              <br />
              Saldo restante: <b>{mxn(pending)}</b>
            </div>
          </Card>
        </div>

        {/* Términos */}
        <div style={{ marginTop: 18, fontSize: 10.5, color: "#475569" }}>
          <b>TÉRMINOS Y CONDICIONES:</b> Presupuesto válido por 10 días. El tiempo de secado puede variar
          según ventilación y clima. Manchas permanentes podrían no salir al 100%. Se requiere anticipo
          para agendar.
        </div>
      </div>
    </div>
  );
}

function Card({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div style={{ border: "1px solid #E2E8F0", borderRadius: 16, padding: 16, background: "#fff" }}>
      <div style={{ fontSize: 13, fontWeight: 900, color: "#0f172a", marginBottom: 10 }}>
        {title}
      </div>
      {children}
    </div>
  );
}

function Line({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ fontSize: 12.5, color: "#0f172a" }}>
      <span style={{ fontWeight: 900 }}>{label}:</span>{" "}
      <span style={{ fontWeight: 600 }}>{value}</span>
    </div>
  );
}