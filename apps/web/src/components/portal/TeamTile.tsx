import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import { ArrowUpRight } from 'lucide-react';

export interface Team {
  name: string;
  slug: string;
  tagline: string;
  icon: LucideIcon;
  accent: string;      // text color
  bg: string;          // gradient bg
}

export function TeamTile({ team }: { team: Team }) {
  const Icon = team.icon;
  return (
    <Link
      href={`/login?team=${team.slug}`}
      className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.14] hover:bg-white/[0.04]"
    >
      {/* Hover glow */}
      <div className={`absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br ${team.bg} opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-40`} />

      <div className="relative flex items-start justify-between">
        <div className={`grid h-12 w-12 place-items-center rounded-xl border border-white/[0.08] bg-gradient-to-br ${team.bg} ${team.accent}`}>
          <Icon size={22} strokeWidth={1.75} />
        </div>
        <ArrowUpRight
          size={16}
          className="text-slate-600 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-slate-300 group-hover:opacity-100"
        />
      </div>

      <h3 className="relative mt-6 text-lg font-bold tracking-tight text-white">
        {team.name}
      </h3>
      <p className="relative mt-1.5 text-[13px] leading-relaxed text-slate-400">
        {team.tagline}
      </p>

      <div className="relative mt-5 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest-2 text-slate-500">
        <span className={`h-1.5 w-1.5 rounded-full ${team.accent.replace('text-', 'bg-')}`} />
        Enter workspace
      </div>
    </Link>
  );
}
