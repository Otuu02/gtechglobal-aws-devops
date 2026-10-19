'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { KpiCard } from '@/components/dashboard/KpiCard';
import { ChartCard } from '@/components/dashboard/ChartCard';

type Snapshot = {
  generatedAt: string;
  companyHealth: {
    activeProjects: number; tasksTodo: number; overdueTasks: number;
    pendingApprovals: number; pendingExpenses: number; openLeads: number;
  };
  alerts: { level: string; message: string }[];
};

export default function DashboardPage() {
  const [snapshot, setSnapshot] = useState<Snapshot | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get<Snapshot>('/dashboard/executive')
      .then(({ data }) => setSnapshot(data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-8 animate-fadeIn">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Executive Command Center</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight">Company health at a glance</h1>
        </div>
        <p className="text-xs text-slate-500">
          {loading ? 'Loading…' : `Updated ${snapshot ? new Date(snapshot.generatedAt).toLocaleString() : '—'}`}
        </p>
      </header>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <KpiCard label="Active projects"  value={snapshot?.companyHealth.activeProjects ?? '—'} />
        <KpiCard label="Tasks to do"      value={snapshot?.companyHealth.tasksTodo ?? '—'} />
        <KpiCard label="Overdue tasks"    value={snapshot?.companyHealth.overdueTasks ?? '—'} tone="warning" />
        <KpiCard label="Pending approvals" value={snapshot?.companyHealth.pendingApprovals ?? '—'} tone="info" />
        <KpiCard label="Pending expenses" value={snapshot?.companyHealth.pendingExpenses ?? '—'} />
        <KpiCard label="Open leads"       value={snapshot?.companyHealth.openLeads ?? '—'} tone="success" />
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ChartCard title="Revenue trend" subtitle="Monthly, all business arms">
            <div className="flex h-56 items-end gap-2">
              {[38, 52, 44, 61, 73, 68, 82, 90, 78, 95, 88, 104].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-md bg-gradient-to-t from-brand-600/40 to-brand-400"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </ChartCard>
        </div>
        <ChartCard title="Alerts" subtitle="Needs attention">
          <ul className="space-y-3 text-sm">
            {snapshot?.alerts.length ? (
              snapshot.alerts.map((a, i) => (
                <li key={i} className="flex items-start gap-3 rounded-lg border border-white/5 bg-navy-950/40 p-3">
                  <span className={`mt-1 h-2 w-2 shrink-0 rounded-full ${a.level === 'warning' ? 'bg-amber-400' : 'bg-brand-400'}`} />
                  <span className="text-slate-300">{a.message}</span>
                </li>
              ))
            ) : (
              <li className="text-slate-500">No alerts today.</li>
            )}
          </ul>
        </ChartCard>
      </section>
    </div>
  );
}
