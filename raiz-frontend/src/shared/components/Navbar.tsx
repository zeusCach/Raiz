// shared/components/Navbar.tsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../features/auth/store/authStore';
import { logoutUsuario } from '../../features/auth/services/auth.services';
import { useSearchStore } from '../../features/feed/store/searchStore';

export function Navbar() {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const navigate = useNavigate();
  const query = useSearchStore((state) => state.query);
  const setQuery = useSearchStore((state) => state.setQuery);
  const [buscadorMovilAbierto, setBuscadorMovilAbierto] = useState(false);

  async function handleLogout() {
    await logoutUsuario();
    setUser(null);
    navigate('/feed');
  }

  return (
    <header className="border-b border-arcilla bg-papel">
      <div className="flex items-center justify-between px-4 py-3 md:px-8 md:py-4">
        <Link to="/feed" className="flex shrink-0 items-center gap-2">
          <span className="text-2xl">🌱</span>
          <span className="hidden font-display text-xl font-bold text-tinta sm:inline">Raíz</span>
        </Link>

        {/* Buscador completo — solo desktop */}
        <div className="mx-8 hidden max-w-md flex-1 md:block">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar posts, comunidades..."
            className="w-full rounded-full border border-arcilla bg-white/60 px-4 py-2 text-sm text-tinta placeholder:text-tinta/40 focus:outline-none focus:ring-2 focus:ring-verde/40"
          />
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          {/* Ícono de búsqueda — solo mobile */}
          <button
            onClick={() => setBuscadorMovilAbierto((v) => !v)}
            className="rounded-full p-2 text-tinta/70 hover:bg-arcilla/30 md:hidden"
            aria-label="Buscar"
          >
            <span className="text-xl">🔍</span>
          </button>

          {user ? (
            <div className="hidden items-center gap-3 md:flex">
              <span className="font-body text-sm text-tinta/80">
                Hola, {user.nombre.split(' ')[0]}
              </span>
              <button
                onClick={handleLogout}
                className="rounded-full border border-arcilla px-4 py-2 text-sm font-medium text-tinta hover:bg-arcilla/30"
              >
                Cerrar sesión
              </button>
            </div>
          ) : (
            <div className="hidden items-center gap-3 md:flex">
              <Link
                to="/login"
                className="rounded-full border border-arcilla px-4 py-2 text-sm font-medium text-tinta hover:bg-arcilla/30"
              >
                Iniciar sesión
              </Link>
              <Link
                to="/registro"
                className="rounded-full bg-verde px-4 py-2 text-sm font-semibold text-papel hover:bg-verde-light"
              >
                Registrarse
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Buscador expandido — solo mobile, se abre debajo del navbar */}
      {buscadorMovilAbierto && (
        <div className="border-t border-arcilla px-4 py-3 md:hidden">
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar posts, comunidades..."
            className="w-full rounded-full border border-arcilla bg-white/60 px-4 py-2 text-sm text-tinta placeholder:text-tinta/40 focus:outline-none focus:ring-2 focus:ring-verde/40"
          />
        </div>
      )}
    </header>
  );
}