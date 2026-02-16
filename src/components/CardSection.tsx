import React from "react";

export default function CardSection({
  title,
  subtitle,
  icon,
  right,
  children,
}: {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  right?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="bg-white rounded-xl2 shadow-soft border border-slate-100 overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-brand-100 text-brand-800 flex items-center justify-center">
            {icon ?? <span className="font-black">✓</span>}
          </div>
          <div>
            <h2 className="text-base md:text-lg font-extrabold text-slate-800">{title}</h2>
            {subtitle ? <p className="text-xs md:text-sm text-slate-500 font-semibold">{subtitle}</p> : null}
          </div>
        </div>
        {right}
      </div>
      <div className="p-5">{children}</div>
    </section>
  );
}