
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../auth/store/authStore';

export function RightSidebar() {
  const user = useAuthStore((state) => state.user);

  return (
    <aside className="flex w-72 flex-col gap-4 p-6">
      <div className="rounded-2xl border border-arcilla bg-white/60 p-5">
        <h3 className="font-display text-lg font-semibold text-tinta">Comparte algo</h3>
        <p className="mt-1 text-sm text-tinta/60">
          Cuéntale a tu comunidad qué está pasando: un evento, una necesidad, una idea.
        </p>
        {user ? (
          <Link
            to="/publicar"
            className="mt-4 block w-full rounded-full bg-verde px-4 py-2.5 text-center text-sm font-semibold text-papel transition hover:bg-verde-light"
          >
            Publicar
          </Link>
        ) : (
          <Link
            to="/login"
            className="mt-4 block w-full rounded-full bg-terracota px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-terracota/90"
          >
            Iniciar sesión para publicar
          </Link>
        )}
      </div>

      <div className="rounded-2xl border border-arcilla bg-white/60 p-5">
        <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-tinta">
          <span>✨</span> En tendencia
        </h3>
        <p className="mt-2 text-sm text-tinta/60">
          Las publicaciones con más apoyo de la comunidad aparecerán aquí.
        </p>
      </div>
    </aside>
  );
}