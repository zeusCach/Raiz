import type { ReactNode } from 'react';

// This utility is intentionally co-located with the field component for shared form styling.
// eslint-disable-next-line react-refresh/only-export-components
export function inputClass(hasError: boolean) {
  return [
    'w-full rounded-xl border bg-papel px-4 py-2.5 font-body text-tinta placeholder:text-tinta/40',
    'focus:outline-none focus:ring-2 focus:ring-verde/50',
    hasError ? 'border-terracota' : 'border-arcilla',
  ].join(' ');
}

export function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block font-body text-sm font-medium text-tinta/80">{label}</label>
      {children}
      {error && <p className="mt-1 text-xs text-terracota">{error}</p>}
    </div>
  );
}