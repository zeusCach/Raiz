// features/profile/pages/ProfilePage.tsx
import { useParams } from 'react-router-dom';
import { useProfile } from '../hooks/useProfile';
import { FollowButton } from '../components/FollowButton';
import { PostCard } from '../../postCultura/components/postCard/PostCard';

export function ProfilePage() {
  const { id } = useParams<{ id: string }>();
  const { perfil, posts, loading, error } = useProfile(id);

  if (loading) {
    return <div className="px-4 py-8 text-center text-tinta/50 md:px-8">Cargando perfil...</div>;
  }

  if (error || !perfil) {
    return (
      <div className="px-4 py-8 text-center text-terracota md:px-8">
        {error ?? 'Perfil no encontrado.'}
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-6 md:px-8">
      <div className="flex items-center justify-between rounded-2xl border border-arcilla bg-white/60 p-6">
        <div className="flex items-center gap-4">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-verde/15 font-display text-2xl font-semibold text-verde">
            {perfil.nombre.charAt(0).toUpperCase()}
          </span>
          <div>
            <h1 className="font-display text-xl font-bold text-tinta">{perfil.nombre}</h1>
            <p className="text-sm text-tinta/50">
              Miembro desde{' '}
              {new Date(perfil.createdAt).toLocaleDateString('es-MX', {
                month: 'long',
                year: 'numeric',
              })}
            </p>
          </div>
        </div>
        <FollowButton perfilId={perfil._id} />
      </div>

      <h2 className="mb-4 mt-8 font-display text-lg font-semibold text-tinta">
        Publicaciones ({posts.length})
      </h2>

      {posts.length === 0 ? (
        <p className="text-tinta/50">Todavía no ha publicado nada.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </main>
  );
}