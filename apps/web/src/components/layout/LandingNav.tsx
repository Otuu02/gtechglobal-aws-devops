'use client';

import Link from 'next/link';
import Image from 'next/image';

export function LandingNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border-subtle bg-canvas/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/logo/gtechglobal-logo.png"
            alt="GTECHGLOBAL"
            width={32}
            height={32}
            priority
            className="h-8 w-8 rounded-md object-cover"
          />
          <span className="text-[14px] font-semibold tracking-tight">GTECHGLOBAL</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          <Link
            href="#teams"
            className="rounded-md px-3 py-1.5 text-[13px] font-medium text-text-secondary transition hover:bg-surface-1 hover:text-text-primary"
          >
            Teams
          </Link>
          <Link
            href="#news"
            className="rounded-md px-3 py-1.5 text-[13px] font-medium text-text-secondary transition hover:bg-surface-1 hover:text-text-primary"
          >
            Company
          </Link>
          <Link
            href="#resources"
            className="rounded-md px-3 py-1.5 text-[13px] font-medium text-text-secondary transition hover:bg-surface-1 hover:text-text-primary"
          >
            Resources
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="rounded-md bg-white px-3.5 py-1.5 text-[13px] font-medium text-black transition hover:bg-gray-200"
          >
            Sign in
          </Link>
        </div>
      </div>
    </header>
  );
}
