// features/landing/pages/LandingPage.tsx
import { Link } from 'react-router-dom';
import { FaSeedling } from 'react-icons/fa';
import { useAuthStore } from '../../auth/store/authStore';

export function LandingPage() {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="min-h-screen bg-papel">
      {/* Navbar */}
      <header className="flex items-center justify-between border-b border-arcilla px-6 py-5 md:px-12">
        <div className="flex items-center gap-2">
          <FaSeedling className="h-6 w-6 text-verde" />
          <span className="font-display text-lg font-bold text-tinta">Raíz</span>
        </div>
        {user ? (
          <Link
            to="/feed"
            className="rounded-full bg-verde px-4 py-2 text-sm font-semibold text-papel transition hover:bg-verde-light"
          >
            Ir a mi feed
          </Link>
        ) : (
          <div className="flex items-center gap-2">
            <Link to="/login" className="rounded-full px-4 py-2 text-sm font-medium text-tinta/70 hover:bg-arcilla/30">
              Iniciar sesión
            </Link>
            <Link
              to="/registro"
              className="rounded-full bg-verde px-4 py-2 text-sm font-semibold text-papel transition hover:bg-verde-light"
            >
              Registrarse
            </Link>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <img
          src="/images/hero-raiz.png"
          alt="Paisaje ilustrado de Raíz: raíces bajo tierra conectando escenas de comunidad, tradición y territorio"
          className="h-[420px] w-full object-cover md:h-[560px]"
          style={{ animation: 'fade-in-up 0.9s ease-out both' }}
        />

        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-papel via-papel/70 to-transparent md:from-papel md:via-papel/40"
          aria-hidden="true"
        />

        <div className="absolute inset-0 flex items-center">
          <div className="max-w-2xl px-6 md:px-12">
            <h1
              className="font-display text-5xl font-bold leading-[1.05] text-tinta md:text-7xl"
              style={{ animation: 'fade-in-up 0.6s ease-out 0.15s both' }}
            >
              Donde la cultura echa <span className="text-terracota">raíces</span>.
            </h1>

            <p
              className="mt-5 text-xl text-tinta/70 md:text-2xl"
              style={{ animation: 'fade-in-up 0.6s ease-out 0.3s both' }}
            >
              Un espacio para compartir, descubrir y mantener vivas las historias que nos conectan.
            </p>

            <div
              className="mt-9"
              style={{ animation: 'fade-in-up 0.6s ease-out 0.45s both' }}
            >
              <Link
                to={user ? '/feed' : '/registro'}
                className="inline-block rounded-full bg-verde px-9 py-3.5 text-base font-semibold text-papel transition hover:bg-verde-light"
              >
                Explorar Raíz
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Presentación breve */}
      <section className="mx-auto max-w-2xl px-6 py-20 text-center">
        <p
          className="font-display text-2xl leading-relaxed text-tinta md:text-3xl"
        >
          Raíz nace en Felipe Carrillo Puerto para conectar comunidades a través de su cultura,
          sus tradiciones y su gente.
        </p>
        <p className="mt-4 text-tinta/60">
          Estamos en fase beta — explora y cuéntanos qué piensas.
        </p>
      </section>

      <footer className="border-t border-arcilla py-8 text-center text-xs text-tinta/80">
        Hecho por FlowMap Studio
      </footer>
    </div>
  );
}