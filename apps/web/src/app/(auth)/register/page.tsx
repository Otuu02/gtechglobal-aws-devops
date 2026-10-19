'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.post('/auth/register', form);
      localStorage.setItem('gg_access_token', data.accessToken);
      localStorage.setItem('gg_refresh_token', data.refreshToken);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err?.response?.data?.error?.message ?? 'Registration failed.');
    } finally {
      setLoading(false);
    }
  }

  function field(key: keyof typeof form, label: string, type = 'text') {
    return (
      <div>
        <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-slate-400">
          {label}
        </label>
        <input
          type={type}
          required
          value={form[key]}
          onChange={(e) => setForm({ ...form, [key]: e.target.value })}
          className="w-full rounded-xl border border-white/10 bg-navy-950/60 px-4 py-3 text-sm placeholder-slate-500 transition focus:border-brand-400 focus:bg-navy-950"
        />
      </div>
    );
  }

  return (
    <>
      <header className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">Create your account</h1>
        <p className="mt-1 text-sm text-slate-400">You&apos;ll be the first administrator.</p>
      </header>

      <form onSubmit={onSubmit} className="space-y-5">
        <div className="grid grid-cols-2 gap-3">
          {field('firstName', 'First name')}
          {field('lastName', 'Last name')}
        </div>
        {field('email', 'Email', 'email')}
        {field('password', 'Password', 'password')}

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
          {loading ? 'Creating account…' : 'Create account'}
        </button>

        <p className="text-center text-xs text-slate-500">
          Already registered?{' '}
          <Link href="/login" className="text-brand-300 hover:text-brand-200">
            Sign in
          </Link>
        </p>
      </form>
    </>
  );
}
