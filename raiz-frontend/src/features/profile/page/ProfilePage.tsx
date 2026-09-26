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
      <div className="overflow-hidden rounded-2xl border border-arcilla bg-white/60">
        {/* Banner */}
        <div className="h-28 bg-gradient-to-r from-verde/30 via-ocre/20 to-terracota/20 md:h-36" />

        <div className="px-6 pb-6">
          {/* Avatar superpuesto al banner */}
          <div className="-mt-12 flex items-end justify-between md:-mt-14">
            <span className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-verde/15 font-display text-3xl font-semibold text-verde md:h-28 md:w-28 md:text-4xl">
              {perfil.nombre.charAt(0).toUpperCase()}
            </span>
            <div className="mb-2">
              <FollowButton perfilId={perfil._id} />
            </div>
          </div>

          <h1 className="mt-4 font-display text-2xl font-bold text-tinta">{perfil.nombre}</h1>

          {/* Placeholder: aún no existe este campo en el modelo de usuario */}
          <p className="mt-1 text-sm text-tinta/50">
            Agrega una descripción breve sobre ti
          </p>

          <p className="mt-3 text-sm text-tinta/50">
            Miembro desde{' '}
            {new Date(perfil.createdAt).toLocaleDateString('es-MX', {
              month: 'long',
              year: 'numeric',
            })}
          </p>

          <p className="mt-2 text-sm font-medium text-tinta/70">
            {posts.length} publicaci{posts.length === 1 ? 'ón' : 'ones'}
          </p>
        </div>
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