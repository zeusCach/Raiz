import { Link } from 'react-router-dom';
import { useAuthStore } from '../../auth/store/authStore';
import { useTrendingPosts } from '../../postCultura/hooks/useTrendingPosts';

const TIPO_LABEL: Record<string, string> = {
  foro: 'Foro',
  reunion: 'Reunión',
  colaboracion: 'Colaboración',
  donacion: 'Donación',
};

export function RightSidebar() {
  const user = useAuthStore((state) => state.user);
  const { posts, loading } = useTrendingPosts();

  return (
    <aside className="hidden w-72 flex-col gap-4 p-6 lg:flex">
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

        {loading && (
          <p className="mt-2 text-sm text-tinta/50">Cargando...</p>
        )}

        {!loading && posts.length === 0 && (
          <p className="mt-2 text-sm text-tinta/60">
            Las publicaciones con más apoyo de la comunidad aparecerán aquí.
          </p>
        )}

        {!loading && posts.length > 0 && (
          <ul className="mt-3 flex flex-col gap-3">
            {posts.map((post) => (
              <li key={post._id}>
                <Link
                  to={`/post/${post._id}`}
                  className="block rounded-lg px-2 py-1.5 -mx-2 transition hover:bg-arcilla/20"
                >
                  <span className="text-xs font-medium text-verde">
                    {TIPO_LABEL[post.tipo]}
                  </span>
                  <p className="truncate text-sm font-medium text-tinta">{post.titulo}</p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </aside>
  );
}