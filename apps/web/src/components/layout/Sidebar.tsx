'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import {
  LayoutDashboard, CheckSquare, Users, TrendingUp, Wallet,
  Package, Terminal, BookOpen, Sparkles, Shield,
} from 'lucide-react';

const items = [
  { href: '/dashboard',  label: 'Dashboard',  icon: LayoutDashboard },
  { href: '/work',       label: 'Work',       icon: CheckSquare },
  { href: '/crm',        label: 'CRM',        icon: TrendingUp },
  { href: '/finance',    label: 'Finance',    icon: Wallet },
  { href: '/people',     label: 'People',     icon: Users },
  { href: '/products',   label: 'Products',   icon: Package },
  { href: '/technology', label: 'Technology', icon: Terminal },
  { href: '/knowledge',  label: 'Knowledge',  icon: BookOpen },
  { href: '/ai',         label: 'AI',         icon: Sparkles },
  { href: '/admin',      label: 'Admin',      icon: Shield },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 shrink-0 border-r border-white/5 bg-navy-900/60 backdrop-blur lg:flex lg:flex-col">
      <div className="flex h-16 items-center gap-3 border-b border-white/5 px-6">
        <div className="grid h-8 w-8 place-items-center rounded-lg bg-brand-500 text-sm font-bold">G</div>
        <div>
          <div className="text-sm font-semibold tracking-tight">GTECHGLOBAL</div>
          <div className="text-[10px] uppercase tracking-[0.2em] text-slate-500">OS · v0.1</div>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-6">
        {items.map(({ href, label, icon: Icon }) => {
          const active = pathname?.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={clsx(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition',
                active
                  ? 'bg-brand-500/15 text-white ring-1 ring-brand-400/30'
                  : 'text-slate-400 hover:bg-white/5 hover:text-white',
              )}
            >
              <Icon size={16} className={active ? 'text-brand-300' : ''} />
              <span className="font-medium">{label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/5 p-4 text-[11px] text-slate-500">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> All systems operational
        </span>
      </div>
    </aside>
  );
}
