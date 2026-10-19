export function ChartCard({
  title, subtitle, children,
}: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/5 bg-navy-900/40 p-6 shadow-soft">
      <header className="mb-5 flex items-baseline justify-between">
        <div>
          <h3 className="text-sm font-semibold tracking-tight text-slate-100">{title}</h3>
          {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
        </div>
      </header>
      {children}
    </div>
  );
}
