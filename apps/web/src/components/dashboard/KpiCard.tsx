import clsx from 'clsx';

type Tone = 'default' | 'info' | 'warning' | 'success';

const toneStyles: Record<Tone, string> = {
  default:  'text-slate-100',
  info:     'text-brand-300',
  warning:  'text-amber-300',
  success:  'text-emerald-300',
};

export function KpiCard({
  label, value, tone = 'default', hint,
}: { label: string; value: number | string; tone?: Tone; hint?: string }) {
  return (
    <div className="rounded-2xl border border-white/5 bg-navy-900/40 p-5 shadow-soft transition hover:border-white/10">
      <p className="text-xs uppercase tracking-wider text-slate-500">{label}</p>
      <p className={clsx('mt-2 text-3xl font-semibold tracking-tight', toneStyles[tone])}>{value}</p>
      {hint && <p className="mt-1 text-xs text-slate-500">{hint}</p>}
    </div>
  );
}
