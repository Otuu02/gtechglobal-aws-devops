'use client';

import { Bell, Search } from 'lucide-react';

export function Topbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-white/5 bg-navy-900/40 px-6 backdrop-blur lg:px-10">
      <div className="relative w-full max-w-md">
        <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
        <input
          placeholder="Search people, projects, docs…"
          className="w-full rounded-xl border border-white/5 bg-navy-950/60 py-2.5 pl-9 pr-3 text-sm placeholder-slate-500 transition focus:border-brand-400"
        />
      </div>
      <div className="flex items-center gap-3">
        <button className="relative grid h-9 w-9 place-items-center rounded-xl border border-white/5 bg-navy-950/60 hover:bg-white/5">
          <Bell size={16} />
          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-cyan-400" />
        </button>
        <div className="flex items-center gap-2 rounded-xl border border-white/5 bg-navy-950/60 px-3 py-1.5">
          <div className="grid h-6 w-6 place-items-center rounded-full bg-brand-500 text-[11px] font-semibold">A</div>
          <span className="text-xs font-medium text-slate-300">Founder</span>
        </div>
      </div>
    </header>
  );
}
