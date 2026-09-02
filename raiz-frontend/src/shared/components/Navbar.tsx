import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <header className="flex items-center justify-between border-b border-arcilla bg-papel px-8 py-4">
      <Link to="/feed" className="flex items-center gap-2">
        <span className="text-2xl">🌱</span>
        <span className="font-display text-xl font-bold text-tinta">Raíz</span>
      </Link>

      <div className="flex-1 max-w-md mx-8">
        <input
          type="text"
          placeholder="Buscar posts, comunidades..."
          className="w-full rounded-full border border-arcilla bg-white/60 px-4 py-2 text-sm text-tinta placeholder:text-tinta/40 focus:outline-none focus:ring-2 focus:ring-verde/40"
        />
      </div>

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
    </header>
  );
}
