export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative flex min-h-screen items-center justify-center px-6">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-brand-500/15 blur-3xl" />
      </div>
      <div className="relative w-full max-w-md rounded-2xl glass p-8 shadow-soft animate-fadeIn">
        {children}
      </div>
    </main>
  );
}
