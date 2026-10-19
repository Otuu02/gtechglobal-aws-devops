import clsx from 'clsx';

export function Table({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={clsx('overflow-hidden rounded-2xl border border-white/5 bg-navy-900/40', className)}>
      <table className="w-full text-left text-sm">{children}</table>
    </div>
  );
}

export function THead({ children }: { children: React.ReactNode }) {
  return <thead className="border-b border-white/5 text-xs uppercase tracking-wider text-slate-500">{children}</thead>;
}

export function TR({ children, className }: { children: React.ReactNode; className?: string }) {
  return <tr className={clsx('border-b border-white/5 last:border-0 hover:bg-white/[0.02]', className)}>{children}</tr>;
}

export function TH({ children, className }: { children: React.ReactNode; className?: string }) {
  return <th className={clsx('px-4 py-3 font-medium', className)}>{children}</th>;
}

export function TD({ children, className }: { children: React.ReactNode; className?: string }) {
  return <td className={clsx('px-4 py-3 text-slate-300', className)}>{children}</td>;
}
