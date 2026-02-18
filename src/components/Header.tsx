import type { DocType } from "../lib/types";

type Props = {
  logoDataUrl: string | null;
  onLogoChange: (dataUrl: string | null) => void;

  docType: DocType;
  onDocTypeChange: (t: DocType) => void;
};

export default function Header({
  logoDataUrl,
  onLogoChange,
  docType,
  onDocTypeChange,
}: Props) {
  return (
    <header className="bg-brand-50">
      {/* safe-area para iPhone notch */}
      <div className="pt-[env(safe-area-inset-top)]" />

      <div className="mx-auto max-w-6xl px-4 sm:px-5 py-5">
        <div className="rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-700 to-sky-500 text-white shadow-soft overflow-hidden">
          <div className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              {/* Izquierda: logo + textos */}
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center overflow-hidden shrink-0">
                  {logoDataUrl ? (
                    <img
                      src={logoDataUrl}
                      alt="Logo"
                      className="w-full h-full object-contain p-2"
                    />
                  ) : (
                    <span className="text-xl font-black">M</span>
                  )}
                </div>

                <div className="min-w-0">
                  {/* Selector de tipo */}
                  <div className="inline-flex rounded-2xl bg-white/10 border border-white/15 p-1 w-fit">
                    {(["Nota", "Presupuesto", "Orden de servicio"] as const).map((t) => {
                      const active = docType === t;
                      return (
                        <button
                          key={t}
                          type="button"
                          onClick={() => onDocTypeChange(t)}
                          className={
                            "px-3 py-2 rounded-xl text-sm font-extrabold transition " +
                            (active
                              ? "bg-white text-indigo-900 shadow-soft"
                              : "text-white/90 hover:bg-white/10")
                          }
                        >
                          {t}
                        </button>
                      );
                    })}
                  </div>

                  <div className="text-sm sm:text-base font-semibold text-white/85 truncate mt-2">
                    Lavado de tapicería y alfombras
                  </div>
                </div>
              </div>

              {/* Derecha: botón + fecha/hora */}
              <div className="flex sm:flex-col sm:items-end gap-3 sm:gap-2">
                <label className="inline-flex">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      const reader = new FileReader();
                      reader.onload = () => onLogoChange(String(reader.result));
                      reader.readAsDataURL(file);
                    }}
                  />

                  {/* Botón: compacto en móvil */}
                  <span className="cursor-pointer select-none rounded-2xl bg-white/12 hover:bg-white/18 border border-white/20 px-4 py-3 sm:px-5 sm:py-3 font-extrabold text-sm sm:text-base">
                    Subir logo
                  </span>
                </label>

                {/* Fecha/hora: NO se sale en móvil */}
                <div className="text-right leading-tight max-w-[46vw] sm:max-w-none">
                  <div className="text-[11px] sm:text-xs font-bold text-white/85 truncate">
                    {new Date().toLocaleDateString("es-MX", {
                      weekday: "long",
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </div>
                  <div className="text-sm sm:text-base font-black truncate">
                    {new Date().toLocaleTimeString("es-MX", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* opcional: línea inferior estética */}
          <div className="h-1 bg-white/10" />
        </div>
      </div>
    </header>
  );
}