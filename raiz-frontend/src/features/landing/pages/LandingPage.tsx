// features/landing/pages/LandingPage.tsx
import { Link } from 'react-router-dom';
import { FaSeedling } from 'react-icons/fa';
import { useAuthStore } from '../../auth/store/authStore';
import { LoginForm } from '../../auth/components/LoginForm';

export function LandingPage() {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="min-h-screen">
      {/* Fondo verde difuminado, mismo patrón que AuthLayout */}
      <div className="relative overflow-hidden bg-tinta">
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-verde/70 via-tinta/60 to-terracota/40"
          aria-hidden="true"
        />

        {/* Navbar */}
        <header className="relative flex items-center justify-between px-6 py-5 md:px-12">
          <div className="flex items-center gap-2">
            <FaSeedling className="h-6 w-6 text-papel" />
            <span className="font-display text-lg font-bold text-papel">Raíz</span>
          </div>
          {user ? (
            <Link
              to="/feed"
              className="rounded-full bg-verde px-4 py-2 text-sm font-semibold text-papel transition hover:bg-verde-light"
            >
              Ir a mi feed
            </Link>
          ) : (
            <Link
              to="/registro"
              className="rounded-full bg-papel px-4 py-2 text-sm font-semibold text-tinta transition hover:bg-papel/90"
            >
              Registrarse
            </Link>
          )}
        </header>

        {/* Hero */}
        <section className="relative mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-2 md:items-center md:py-24">
          <div style={{ animation: 'fade-in-up 0.6s ease-out both' }}>
            <h1 className="font-display text-5xl font-bold leading-[1.05] text-papel md:text-6xl">
              Donde la cultura echa <span className="text-ocre">raíces</span>.
            </h1>

            <p className="mt-5 text-xl text-papel/80">
              Un espacio para compartir, descubrir y mantener vivas las historias que nos conectan.
            </p>

            {user ? (
              <Link
                to="/feed"
                className="mt-9 inline-block rounded-full bg-papel px-9 py-3.5 text-base font-semibold text-tinta transition hover:bg-papel/90"
              >
                Explorar Raíz
              </Link>
            ) : (
              <p className="mt-9 text-sm text-papel/60">
                ¿No tienes cuenta?{' '}
                <Link to="/registro" className="font-medium text-papel hover:underline">
                  Regístrate aquí
                </Link>
              </p>
            )}
          </div>

          {!user && (
            <div
              className="rounded-2xl bg-papel p-6 shadow-lg md:p-8"
              style={{ animation: 'fade-in-up 0.6s ease-out 0.15s both' }}
            >
              <LoginForm />
            </div>
          )}
        </section>

         <footer className="py-8 text-center text-xs text-white">
          Desarrollado por Grupo Tecnológico de la Riviera - GRUTEC
         </footer>
      </div>
    </div>
  );
}
