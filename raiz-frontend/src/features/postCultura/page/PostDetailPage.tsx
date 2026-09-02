import { useParams, Link } from 'react-router-dom';
import { PostCard } from '../components/postCard/PostCard';
import { usePost } from '../hooks/usePost';


export function PostDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { post, loading, error } = usePost(id);

  return (
    <main className="mx-auto max-w-2xl px-8 py-6">
      <Link to="/feed" className="mb-4 inline-block text-sm text-verde hover:underline">
        ← Volver al feed
      </Link>

      {loading && <p className="text-tinta/50">Cargando publicación...</p>}

      {error && (
        <div className="rounded-xl border border-terracota/30 bg-terracota/10 px-4 py-3 text-terracota">
          No se pudo cargar la publicación. {error}
        </div>
      )}

      {!loading && !error && !post && (
        <div className="rounded-xl border border-arcilla bg-white/40 px-4 py-8 text-center text-tinta/50">
          Esta publicación no existe o fue eliminada.
        </div>
      )}

      {post && <PostCard post={post} />}
    </main>
  );
}