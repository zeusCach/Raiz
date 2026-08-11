import { useState } from 'react';
import { PostCard } from '../../postCultura/components/postCard/PostCard';
import { usePosts } from '../../postCultura/hooks/usePosts';

type FeedTab = 'descubrir' | 'siguiendo';

export function Feed() {
  const [tab, setTab] = useState<FeedTab>('descubrir');
  const { posts, loading, error } = usePosts();

  return (
    <main className="flex-1 px-8 py-6">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-tinta">Feed comunitario</h1>
          <p className="mt-1 text-tinta/60">
            Descubre lo que tu comunidad está compartiendo ahora.
          </p>
        </div>

        <div className="flex rounded-full border border-arcilla bg-white/60 p-1">
          <button
            onClick={() => setTab('descubrir')}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
              tab === 'descubrir' ? 'bg-verde text-papel' : 'text-tinta/60'
            }`}
          >
            Descubrir
          </button>
          <button
            onClick={() => setTab('siguiendo')}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
              tab === 'siguiendo' ? 'bg-verde text-papel' : 'text-tinta/60'
            }`}
          >
            Siguiendo
          </button>
        </div>
      </div>

      {loading && <p className="text-tinta/50">Cargando publicaciones...</p>}

      {error && (
        <div className="rounded-xl border border-terracota/30 bg-terracota/10 px-4 py-3 text-terracota">
          No se pudieron cargar las publicaciones. {error}
        </div>
      )}

      {!loading && !error && posts.length === 0 && (
        <div className="rounded-xl border border-arcilla bg-white/40 px-4 py-8 text-center text-tinta/50">
          Todavía no hay publicaciones. Sé la primera persona en compartir algo.
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