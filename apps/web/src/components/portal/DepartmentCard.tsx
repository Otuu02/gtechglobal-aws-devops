import Link from 'next/link';
import clsx from 'clsx';
import type { LucideIcon } from 'lucide-react';

export interface Department {
  name: string;
  slug: string;
  description: string;
  icon: LucideIcon;
  accent: 'brand' | 'cyan' | 'emerald' | 'amber' | 'rose' | 'violet';
  memberCount: number;
}

const accentClasses: Record<Department['accent'], { bg: string; text: string; ring: string; glow: string }> = {
  brand:   { bg: 'from-brand-500/20 to-brand-500/5',   text: 'text-brand-300',   ring: 'hover:border-brand-400/40',   glow: 'group-hover:bg-brand-500/20'   },
  cyan:    { bg: 'from-cyan-500/20 to-cyan-500/5',     text: 'text-cyan-300',    ring: 'hover:border-cyan-400/40',    glow: 'group-hover:bg-cyan-400/20'    },
  emerald: { bg: 'from-emerald-500/20 to-emerald-500/5', text: 'text-emerald-300', ring: 'hover:border-emerald-400/40', glow: 'group-hover:bg-emerald-400/20' },
  amber:   { bg: 'from-amber-500/20 to-amber-500/5',   text: 'text-amber-300',   ring: 'hover:border-amber-400/40',   glow: 'group-hover:bg-amber-400/20'   },
  rose:    { bg: 'from-rose-500/20 to-rose-500/5',     text: 'text-rose-300',    ring: 'hover:border-rose-400/40',    glow: 'group-hover:bg-rose-400/20'    },
  violet:  { bg: 'from-violet-500/20 to-violet-500/5', text: 'text-violet-300',  ring: 'hover:border-violet-400/40',  glow: 'group-hover:bg-violet-400/20'  },
};

export function DepartmentCard({ department }: { department: Department }) {
  const Icon = department.icon;
  const accent = accentClasses[department.accent];

  return (
    <Link
      href={`/login?department=${department.slug}`}
      className={clsx(
        'group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 transition-all duration-300',
        'hover:-translate-y-1 hover:bg-white/[0.04]',
        accent.ring,
      )}
    >
      <div className={clsx('absolute -right-16 -top-16 h-32 w-32 rounded-full blur-3xl transition-all duration-500 bg-transparent', accent.glow)} />
      <div className="relative flex items-start justify-between">
        <div className={clsx('grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-gradient-to-br', accent.bg, accent.text)}>
          <Icon size={20} />
        </div>
        <div className="rounded-full border border-white/[0.06] bg-white/[0.03] px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-slate-500">
          {department.memberCount} members
        </div>
      </div>
      <h3 className="relative mt-4 text-sm font-semibold tracking-tight text-white">{department.name}</h3>
      <p className="relative mt-1 text-xs leading-relaxed text-slate-500">{department.description}</p>
      <div className={clsx('relative mt-4 flex items-center gap-1 text-xs font-medium opacity-0 transition-opacity group-hover:opacity-100', accent.text)}>
        Enter workspace
        <span className="transition-transform group-hover:translate-x-0.5">→</span>
      </div>
    </Link>
  );
}
