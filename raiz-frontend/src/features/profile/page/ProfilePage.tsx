import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProfile } from '../hooks/useProfile';
import { FollowButton } from '../components/FollowButton';
import { PostCard } from '../../postCultura/components/postCard/PostCard';
import { useAuthStore } from '../../auth/store/authStore';
import { actualizarMiPerfil } from '../../auth/services/auth.services';

export function ProfilePage() {
  const { id } = useParams<{ id: string }>();
  const { perfil, posts, loading, error, refetch } = useProfile(id);
  const sessionUser = useAuthStore((state) => state.user);
  const setSessionUser = useAuthStore((state) => state.setUser);
  const [editando, setEditando] = useState(false);
  const [bio, setBio] = useState('');
  const [formacion, setFormacion] = useState('');
  const [intereses, setIntereses] = useState('');
  const [guardando, setGuardando] = useState(false);

  const esMiPerfil = sessionUser?._id === id;

  function abrirEdicion() {
    if (!perfil) return;
    setBio(perfil.bio);
    setFormacion(perfil.formacion);
    setIntereses(perfil.intereses.join(', '));
    setEditando(true);
  }

  async function guardarCambios() {
    setGuardando(true);
    try {
      const usuarioActualizado = await actualizarMiPerfil({
        bio,
        formacion,
        intereses: intereses.split(',').map((i) => i.trim()).filter(Boolean),
      });
      if (sessionUser) setSessionUser({ ...sessionUser, ...usuarioActualizado });
      setEditando(false);
      refetch();
    } finally {
      setGuardando(false);
    }
  }

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
        <div className="h-28 bg-gradient-to-r from-verde/30 via-ocre/20 to-terracota/20 md:h-36" />

        <div className="px-6 pb-6">
          <div className="-mt-12 flex items-end justify-between md:-mt-14">
            <span className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-verde/15 font-display text-3xl font-semibold text-verde md:h-28 md:w-28 md:text-4xl">
              {perfil.nombre.charAt(0).toUpperCase()}
            </span>
            <div className="mb-2">
              {esMiPerfil ? (
                <button
                  onClick={abrirEdicion}
                  className="rounded-full border border-arcilla px-4 py-2 text-sm font-medium text-tinta hover:bg-arcilla/30"
                >
                  Editar perfil
                </button>
              ) : (
                <FollowButton perfilId={perfil._id} />
              )}
            </div>
          </div>

          <h1 className="mt-4 font-display text-2xl font-bold text-tinta">{perfil.nombre}</h1>

          <p className="mt-1 text-sm text-tinta/70">
            {perfil.bio || (esMiPerfil ? 'Agrega una descripción breve sobre ti' : '')}
          </p>

          {perfil.formacion && (
            <p className="mt-2 text-sm text-tinta/60">🎓 {perfil.formacion}</p>
          )}

          {perfil.intereses.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {perfil.intereses.map((interes) => (
                <span
                  key={interes}
                  className="rounded-full bg-arcilla/40 px-2.5 py-1 text-xs font-medium text-tinta/70"
                >
                  {interes}
                </span>
              ))}
            </div>
          )}

          <p className="mt-3 text-sm text-tinta/50">
            Miembro desde{' '}
            {new Date(perfil.createdAt).toLocaleDateString('es-MX', {
              month: 'long',
              year: 'numeric',
            })}
          </p>

          <p className="mt-2 text-sm font-medium text-tinta/70">
            {perfil.seguidoresCount} seguidor{perfil.seguidoresCount === 1 ? '' : 'es'} ·{' '}
            {posts.length} publicaci{posts.length === 1 ? 'ón' : 'ones'}
          </p>
        </div>
      </div>

      {editando && (
        <div className="mt-4 rounded-2xl border border-arcilla bg-white/60 p-5">
          <h3 className="font-display text-base font-semibold text-tinta">Editar perfil</h3>

          <div className="mt-4 flex flex-col gap-3">
            <div>
              <label className="text-sm font-medium text-tinta">Descripción breve</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={2}
                className="mt-1 w-full rounded-xl border border-arcilla bg-papel px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-verde/40"
                placeholder="Ej. Estudiante de sistemas apasionado por la cultura maya"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-tinta">Formación académica</label>
              <input
                value={formacion}
                onChange={(e) => setFormacion(e.target.value)}
                className="mt-1 w-full rounded-xl border border-arcilla bg-papel px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-verde/40"
                placeholder="Ej. Ingeniería en Sistemas, ITSC FCP"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-tinta">Intereses (separados por coma)</label>
              <input
                value={intereses}
                onChange={(e) => setIntereses(e.target.value)}
                className="mt-1 w-full rounded-xl border border-arcilla bg-papel px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-verde/40"
                placeholder="Ej. cultura maya, medio ambiente, tecnología"
              />
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            <button
              onClick={guardarCambios}
              disabled={guardando}
              className="rounded-full bg-verde px-4 py-2 text-sm font-semibold text-papel transition hover:bg-verde-light disabled:opacity-50"
            >
              {guardando ? 'Guardando...' : 'Guardar'}
            </button>
            <button
              onClick={() => setEditando(false)}
              className="rounded-full border border-arcilla px-4 py-2 text-sm font-medium text-tinta hover:bg-arcilla/30"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

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