import Link from 'next/link';
import {
  Terminal, Package, TrendingUp, Megaphone, Zap, Wallet, Users, Sparkles,
  BookOpen, LifeBuoy, Calendar, ArrowRight, ShieldCheck,
} from 'lucide-react';
import { LandingNav } from '@/components/layout/LandingNav';
import { AnimatedLogo } from '@/components/brand/AnimatedLogo';

const teams = [
  { name: 'Technology',      slug: 'tech',      icon: Terminal,   desc: 'Engineering & Infrastructure' },
  { name: 'Product',         slug: 'product',   icon: Package,    desc: 'Discovery & Releases' },
  { name: 'Sales',           slug: 'sales',     icon: TrendingUp, desc: 'Leads & Partnerships' },
  { name: 'Marketing',       slug: 'marketing', icon: Megaphone,  desc: 'Brand & Campaigns' },
  { name: 'Operations',      slug: 'ops',       icon: Zap,        desc: 'SOPs & Service Quality' },
  { name: 'Finance',         slug: 'finance',   icon: Wallet,     desc: 'Budgets & Approvals' },
  { name: 'People & HR',     slug: 'people',    icon: Users,      desc: 'Talent & Culture' },
  { name: 'AI & Automation', slug: 'ai',        icon: Sparkles,   desc: 'Agents & Workflows' },
];

const news = [
  { icon: Megaphone, title: 'All-hands meeting this Friday',  meta: '3:00 PM · Main hall' },
  { icon: Zap,       title: 'Q4 access review starts Monday', meta: 'Security initiative' },
  { icon: Users,     title: 'Welcome Sarah N. to Product',    meta: 'Say hello 👋' },
  { icon: BookOpen,  title: 'Updated SOP: Incident Response', meta: 'v2.1 published' },
];

const resources = [
  { icon: BookOpen, name: 'Knowledge Base',   desc: '142 docs' },
  { icon: LifeBuoy, name: 'Help Desk',        desc: '2 open tickets' },
  { icon: Calendar, name: 'Company Calendar', desc: 'Meetings & events' },
];

export default function PortalPage() {
  return (
    <div className="relative min-h-screen">
      <LandingNav />

      {/* Subtle grid backdrop */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-grid bg-grid opacity-[0.35] [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_70%)]" />
      </div>

      <main className="relative mx-auto max-w-6xl px-6 py-12">
        {/* ═══════════════════════════════════════════════
            HERO — Text left, animated logo right
        ═══════════════════════════════════════════════ */}
        <section className="animate-fadeUp">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
            {/* Left: copy */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-md border border-border-subtle bg-surface-0 px-2.5 py-1">
                <ShieldCheck size={12} className="text-brand" />
                <span className="text-label">Confidential · Internal Only</span>
              </div>

              <h1 className="text-display mt-6 text-4xl text-text-primary sm:text-5xl lg:text-6xl">
                Welcome to
                <br />
                <span className="bg-gradient-to-r from-brand to-[#22D3EE] bg-clip-text text-transparent">
                  GTECHGLOBAL
                </span>
              </h1>

              <p className="text-body mt-6 max-w-xl">
                The operational backbone of our company. Select your team to enter your
                workspace, or explore what&apos;s happening across the organization today.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/login"
                  className="group inline-flex h-11 items-center gap-2 rounded-lg bg-white px-5 text-[13px] font-semibold text-black transition hover:bg-gray-200"
                >
                  <ShieldCheck size={15} />
                  Sign in to your workspace
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                </Link>
                <a
                  href="#teams"
                  className="inline-flex h-11 items-center gap-2 rounded-lg border border-border-subtle bg-surface-0 px-5 text-[13px] font-medium text-text-secondary transition hover:border-border-default hover:bg-surface-1 hover:text-text-primary"
                >
                  Explore teams
                </a>
              </div>
            </div>

            {/* Right: animated logo */}
            <div className="flex justify-center lg:col-span-5 lg:justify-end">
              <div className="logo-float">
                <AnimatedLogo size={420} />
              </div>
            </div>
          </div>
        </section>

        {/* ─── Teams ──────────────────────────────────── */}
        <section id="teams" className="mt-20 animate-fadeUp delay-100">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-label">Enter your workspace</h2>
            <Link
              href="/admin"
              className="text-[13px] font-medium text-text-secondary transition hover:text-text-primary"
            >
              Manage departments →
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {teams.map((team, i) => {
              const Icon = team.icon;
              return (
                <Link
                  key={team.slug}
                  href={`/login?team=${team.slug}`}
                  className="surface-0 hover-lift group flex flex-col p-5"
                  style={{ animationDelay: `${100 + i * 40}ms` }}
                >
                  <div className="flex items-center justify-between">
                    <div className="grid h-10 w-10 place-items-center rounded-lg border border-border-subtle bg-surface-1 text-text-secondary transition group-hover:text-brand">
                      <Icon size={18} strokeWidth={1.5} />
                    </div>
                    <ArrowRight
                      size={14}
                      className="text-text-muted opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100"
                    />
                  </div>
                  <h3 className="mt-4 text-[14px] font-semibold text-text-primary">
                    {team.name}
                  </h3>
                  <p className="mt-1 text-[12px] text-text-muted">{team.desc}</p>
                </Link>
              );
            })}
          </div>
        </section>

        {/* ─── News + Resources ───────────────────────── */}
        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-12">
          <section id="news" className="animate-fadeUp delay-200 lg:col-span-7">
            <h2 className="text-label mb-6">Around the company</h2>
            <div className="surface-0 divide-y divide-border-subtle">
              {news.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-4 transition-colors hover:bg-surface-1"
                  >
                    <div className="grid h-9 w-9 shrink-0 place-items-center rounded-md border border-border-subtle bg-surface-1 text-text-secondary">
                      <Icon size={16} strokeWidth={1.5} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[14px] font-medium text-text-primary">{item.title}</p>
                      <p className="text-[12px] text-text-muted">{item.meta}</p>
                    </div>
                    <ArrowRight size={14} className="shrink-0 text-text-muted" />
                  </div>
                );
              })}
            </div>
          </section>

          <section id="resources" className="animate-fadeUp delay-300 lg:col-span-5">
            <h2 className="text-label mb-6">Resources</h2>
            <div className="space-y-2">
              {resources.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href="#"
                    className="surface-0 hover-lift group flex items-center justify-between p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="grid h-8 w-8 place-items-center rounded-md border border-border-subtle bg-surface-1 text-text-secondary">
                        <Icon size={15} strokeWidth={1.5} />
                      </div>
                      <div>
                        <p className="text-[14px] font-medium text-text-primary">{item.name}</p>
                        <p className="text-[12px] text-text-muted">{item.desc}</p>
                      </div>
                    </div>
                    <ArrowRight
                      size={14}
                      className="text-text-muted opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100"
                    />
                  </Link>
                );
              })}
            </div>

            <div className="surface-0 mt-3 p-5">
              <div className="text-label">Team</div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-3xl font-semibold tnum text-text-primary">56</span>
                <span className="text-[12px] text-text-muted">members across 8 teams</span>
              </div>
              <div className="mt-4 flex -space-x-2">
                {['A', 'B', 'C', 'D', 'E', 'F'].map((l, i) => (
                  <div
                    key={i}
                    className="grid h-7 w-7 place-items-center rounded-full border-2 border-canvas bg-surface-2 text-[10px] font-medium text-text-secondary"
                  >
                    {l}
                  </div>
                ))}
                <div className="grid h-7 w-7 place-items-center rounded-full border-2 border-canvas bg-surface-2 text-[10px] font-medium text-text-muted">
                  +50
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* ─── Footer ─────────────────────────────────── */}
        <footer className="mt-24 border-t border-border-subtle pb-12 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-[12px] text-text-muted">
              © {new Date().getFullYear()} GTECHGLOBAL · Internal use only
            </p>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulseSoft" />
              <span className="text-[11px] font-medium text-text-muted">
                All systems operational
              </span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
