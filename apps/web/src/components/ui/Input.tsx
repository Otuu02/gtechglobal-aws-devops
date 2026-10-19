'use client';

import { forwardRef } from 'react';
import clsx from 'clsx';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, hint, error, className, id, ...rest }, ref) => {
    const inputId = id ?? rest.name;
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-slate-400">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={clsx(
            'w-full rounded-xl border bg-navy-950/60 px-4 py-3 text-sm text-slate-100',
            'placeholder-slate-500 transition focus:outline-none focus:ring-4 focus:ring-brand-500/20',
            error ? 'border-red-500/50' : 'border-white/10 focus:border-brand-400',
            className,
          )}
          {...rest}
        />
        {error ? <p className="mt-1 text-xs text-red-400">{error}</p>
         : hint ? <p className="mt-1 text-xs text-slate-500">{hint}</p>
         : null}
      </div>
    );
  },
);
Input.displayName = 'Input';
