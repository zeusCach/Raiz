import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../features/auth/store/authStore";
import { logoutUsuario } from "../../features/auth/services/auth.services";
import { useSearchStore } from "../../features/feed/store/searchStore";

export function Navbar() {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const navigate = useNavigate();
  const query = useSearchStore((state) => state.query);
  const setQuery = useSearchStore((state) => state.setQuery);

  async function handleLogout() {
    await logoutUsuario();
    setUser(null);
    navigate("/feed");
  }

  return (
    <header className="flex items-center justify-between border-b border-arcilla bg-papel px-8 py-4">
      <Link to="/feed" className="flex items-center gap-2">
        <span className="text-2xl">🌱</span>
        <span className="font-display text-xl font-bold text-tinta">Raíz</span>
      </Link>

      <div className="flex-1 max-w-md mx-8">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar posts, comunidades..."
          className="w-full rounded-full border border-arcilla bg-white/60 px-4 py-2 text-sm text-tinta placeholder:text-tinta/40 focus:outline-none focus:ring-2 focus:ring-verde/40"
        />
      </div>

      {user ? (
        <div className="flex items-center gap-3">
          <span className="font-body text-sm text-tinta/80">
            Hola, {user.nombre.split(" ")[0]}
          </span>
          <button
            onClick={handleLogout}
            className="rounded-full border border-arcilla px-4 py-2 text-sm font-medium text-tinta hover:bg-arcilla/30"
          >
            Cerrar sesión
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-3">
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
    </header>
  );
}
