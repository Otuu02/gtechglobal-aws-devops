import { Megaphone, Gift, BookOpen, Users2 } from 'lucide-react';

const news = [
  { icon: Megaphone, tone: 'text-brand-300',   tag: 'Announcement', title: 'All-hands meeting this Friday',           meta: '3:00 PM · Main hall' },
  { icon: Gift,      tone: 'text-amber-300',   tag: 'Policy',       title: 'New expense policy goes live',             meta: 'Effective Oct 1' },
  { icon: Users2,    tone: 'text-emerald-300', tag: 'Welcome',      title: 'Sarah N. joins the Product team',          meta: 'Say hello 👋' },
  { icon: BookOpen,  tone: 'text-cyan-300',    tag: 'Docs',         title: 'Updated SOP — Incident Response',          meta: 'v2.1 published' },
];

export function CompanyPulse() {
  return (
    <ul className="divide-y divide-white/[0.05]">
      {news.map((n, i) => {
        const Icon = n.icon;
        return (
          <li key={i} className="group flex items-center gap-4 py-4 transition hover:bg-white/[0.015]">
            <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/[0.07] bg-white/[0.02] ${n.tone}`}>
              <Icon size={16} strokeWidth={1.75} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-mono text-[10px] uppercase tracking-widest-2 text-slate-500">
                {n.tag}
              </div>
              <div className="mt-0.5 text-[15px] font-semibold leading-tight text-white">
                {n.title}
              </div>
            </div>
            <div className="hidden shrink-0 text-right text-[12px] text-slate-500 sm:block">
              {n.meta}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
