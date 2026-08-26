// features/auth/components/AuthLayout.tsx
// Layout compartido — el compañero puede reusar esto mismo en LoginPage
import type { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
  imageUrl: string;
  imageAlt: string;
  quote: string;
  locationTag?: string;
}

export function AuthLayout({ children, imageUrl, imageAlt, quote, locationTag }: AuthLayoutProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-tinta">
      {/* Fondo difuminado */}
      <div
        className="absolute inset-0 scale-110 bg-cover bg-center opacity-40 blur-2xl"
        style={{ backgroundImage: `url(${imageUrl})` }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-br from-verde/70 via-tinta/60 to-terracota/40"
        aria-hidden="true"
      />

      {/* Panel flotante con margen respecto al fondo */}
      <div className="relative flex min-h-screen items-center justify-center p-4 md:p-6">
        <div className="grid w-full max-w-5xl overflow-hidden rounded-[2rem] bg-papel shadow-2xl md:grid-cols-2">
          {/* Columna izquierda: formulario */}
          <div className="flex flex-col justify-center p-8 sm:p-10 md:p-8">{children}</div>

          {/* Columna derecha: imagen — oculta en mobile */}
          <div className="relative hidden md:block">
            <img src={imageUrl} alt={imageAlt} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-tinta/80 via-tinta/10 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 text-papel">
              {locationTag && (
                <span className="mb-3 inline-block rounded-full bg-papel/15 px-3 py-1 font-body text-xs uppercase tracking-wide backdrop-blur-sm">
                  {locationTag}
                </span>
              )}
              <p className="font-display text-xl leading-snug">{quote}</p>
            </div>
            {/* Signature: motivo de raíz en el borde entre columnas */}
            <svg
              className="pointer-events-none absolute -left-1 top-0 h-full w-6 text-ocre/70"
              viewBox="0 0 24 400"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M12 0 C 4 60, 20 120, 8 180 C -2 240, 18 300, 6 400"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}