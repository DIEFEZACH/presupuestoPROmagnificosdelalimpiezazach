import React from "react";

type Props = {
  logoDataUrl: string | null;
  onLogoChange: (dataUrl: string | null) => void;
};

export default function Header({ logoDataUrl, onLogoChange }: Props) {
  function onPickLogo(file: File | null) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onLogoChange(String(reader.result));
    reader.readAsDataURL(file);
  }

  return (
    <header className="mx-auto max-w-6xl px-5 pt-8">
      <div className="rounded-2xl shadow-soft overflow-hidden border border-slate-100 bg-gradient-to-r from-brand-800 to-brand-400">
        <div className="px-6 py-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center overflow-hidden">
              {logoDataUrl ? (
                <img src={logoDataUrl} alt="Logo" className="w-full h-full object-cover" />
              ) : (
                <span className="text-white font-black text-xl">M</span>
              )}
            </div>

            <div>
              <div className="text-white text-2xl font-black tracking-tight">PRESUPUESTO PRO</div>
              <div className="text-white/80 text-sm font-semibold">Lavado de tapicería y alfombras</div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <label className="cursor-pointer">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => onPickLogo(e.target.files?.[0] ?? null)}
              />
              <div className="rounded-xl bg-white/15 border border-white/25 px-4 py-3 text-white font-black hover:bg-white/20">
                Subir logo
              </div>
            </label>

            <div className="text-right text-white/80 text-xs font-semibold">
              {new Date().toLocaleString("es-MX", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
              <div className="text-white font-black text-base">
                {new Date().toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}