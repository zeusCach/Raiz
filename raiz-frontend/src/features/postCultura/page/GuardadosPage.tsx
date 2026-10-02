// features/postCultura/pages/GuardadosPage.tsx
import { FiBookmark } from 'react-icons/fi';
import { useGuardados } from '../../profile/hooks/useGuardados';
import { PostCard } from '../components/postCard/PostCard';

export function GuardadosPage() {
  const { posts, loading, error } = useGuardados();

  return (
    <main className="mx-auto max-w-2xl px-4 py-6 md:px-8">
      <div className="mb-6 flex items-center gap-2">
        <FiBookmark className="h-6 w-6 text-ocre" />
        <h1 className="font-display text-2xl font-bold text-tinta md:text-3xl">Guardados</h1>
      </div>

      {loading && <p className="text-tinta/50">Cargando...</p>}

      {error && (
        <div className="rounded-xl border border-terracota/30 bg-terracota/10 px-4 py-3 text-terracota">
          {error}
        </div>
      )}

      {!loading && !error && posts.length === 0 && (
        <div className="rounded-xl border border-arcilla bg-white/40 px-4 py-8 text-center text-tinta/50">
          Todavía no has guardado ninguna publicación. Toca el ícono de marcador en cualquier post
          para guardarlo aquí.
        </div>
      )}

      <div className="flex flex-col gap-4">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </main>
  );
}