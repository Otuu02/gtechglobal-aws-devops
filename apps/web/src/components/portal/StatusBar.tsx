import { Activity, CheckCircle2, Clock, Users } from 'lucide-react';

const items = [
  { icon: Activity,     label: 'Active projects',   value: '12', tone: 'text-brand-300'   },
  { icon: CheckCircle2, label: 'Awaiting approval', value: '3',  tone: 'text-amber-300'   },
  { icon: Clock,        label: 'Tasks due today',   value: '5',  tone: 'text-cyan-300'    },
  { icon: Users,        label: 'Team online',       value: '8',  tone: 'text-emerald-300' },
];

export function StatusBar() {
  return (
    <div className="grid grid-cols-2 gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 sm:grid-cols-4">
      {items.map((it) => {
        const Icon = it.icon;
        return (
          <div
            key={it.label}
            className="flex items-center gap-3 rounded-xl px-3 py-2 transition hover:bg-white/[0.03]"
          >
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-white/[0.06] bg-white/[0.02]">
              <Icon size={15} className={it.tone} />
            </div>
            <div className="min-w-0">
              <div className={`text-lg font-semibold leading-none ${it.tone}`}>{it.value}</div>
              <div className="mt-0.5 truncate text-[10px] uppercase tracking-wider text-slate-500">
                {it.label}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
