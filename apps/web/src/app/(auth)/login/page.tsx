'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mfa, setMfa] = useState('');
  const [mfaRequired, setMfaRequired] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.post('/auth/login', {
        email,
        password,
        ...(mfa ? { mfaCode: mfa } : {}),
      });
      if (data.mfaRequired) {
        setMfaRequired(true);
        return;
      }
      localStorage.setItem('gg_access_token', data.accessToken);
      localStorage.setItem('gg_refresh_token', data.refreshToken);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err?.response?.data?.error?.message ?? 'Unable to sign in. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <header className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
        <p className="mt-1 text-sm text-slate-400">Sign in to your GTECHGLOBAL workspace.</p>
      </header>

      <form onSubmit={onSubmit} className="space-y-5">
        <div>
          <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-slate-400">
            Email
          </label>
          <input
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-navy-950/60 px-4 py-3 text-sm placeholder-slate-500 transition focus:border-brand-400 focus:bg-navy-950"
            placeholder="founder@gtechglobal.com"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-slate-400">
            Password
          </label>
          <input
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-navy-950/60 px-4 py-3 text-sm placeholder-slate-500 transition focus:border-brand-400 focus:bg-navy-950"
            placeholder="••••••••"
          />
        </div>

        {mfaRequired && (
          <div className="animate-fadeIn">
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-slate-400">
              Authenticator code
            </label>
            <input
              inputMode="numeric"
              maxLength={6}
              value={mfa}
              onChange={(e) => setMfa(e.target.value.replace(/\D/g, ''))}
              className="w-full rounded-xl border border-white/10 bg-navy-950/60 px-4 py-3 text-sm tracking-[0.5em] placeholder-slate-500 transition focus:border-brand-400"
              placeholder="123456"
            />
          </div>
        )}

        {error && (
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-brand-500 py-3 text-sm font-medium text-white shadow-soft transition hover:bg-brand-600 disabled:opacity-50"
        >
          {loading ? 'Signing in…' : 'Sign in'}
        </button>

        <p className="text-center text-xs text-slate-500">
          No account?{' '}
          <Link href="/register" className="text-brand-300 hover:text-brand-200">
            Create one
          </Link>
        </p>
      </form>
    </>
  );
}
