import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiUsers, FiImage, FiPlus } from 'react-icons/fi';
import { useComunidad } from '../hooks/useComunidad';
import { JoinButton } from '../components/JoinButton';
import { useAuthStore } from '../../auth/store/authStore';
import { actualizarBannerComunidad } from '../services/comunidad.api';
import { BannerPicker } from '../../profile/components/BannerPicker';
import { PostCard } from '../../postCultura/components/postCard/PostCard';
import { useComunidadPosts } from '../hooks/useComunidadPost';

export function ComunidadDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { comunidad, loading, error, setComunidad } = useComunidad(id);
  const { posts, loading: cargandoPosts } = useComunidadPosts(id);
  const user = useAuthStore((state) => state.user);
  const [mostrarBannerPicker, setMostrarBannerPicker] = useState(false);

  if (loading) {
    return <div className="px-4 py-8 text-center text-tinta/50 md:px-8">Cargando comunidad...</div>;
  }

  if (error || !comunidad) {
    return (
      <div className="px-4 py-8 text-center text-terracota md:px-8">
        {error ?? 'Comunidad no encontrada.'}
      </div>
    );
  }

  const esMiembro = !!user && comunidad.miembros.some((m) => m._id === user._id);
  const esCreador = user?._id === comunidad.creador._id;

  async function handleSeleccionarBanner(url: string) {
    const actualizado = await actualizarBannerComunidad(comunidad!._id, url);
    setComunidad(actualizado);
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-6 md:px-8">
      <div className="overflow-hidden rounded-2xl border border-arcilla bg-white/60">
        <div className="relative h-28 bg-gradient-to-r from-verde/30 via-ocre/20 to-terracota/20 md:h-36">
          {comunidad.bannerUrl && (
            <img
              src={comunidad.bannerUrl}
              alt={`Banner de ${comunidad.nombre}`}
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}
          {esCreador && (
            <button
              onClick={() => setMostrarBannerPicker(true)}
              className="absolute bottom-2 right-2 flex items-center gap-1.5 rounded-full bg-tinta/60 px-3 py-1.5 text-xs font-medium text-white hover:bg-tinta/80"
            >
              <FiImage className="h-3.5 w-3.5" /> Cambiar banner
            </button>
          )}
        </div>

        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="font-display text-2xl font-bold text-tinta">{comunidad.nombre}</h1>
              <p className="mt-2 text-sm text-tinta/70">{comunidad.descripcion}</p>
              <p className="mt-3 flex items-center gap-1.5 text-xs text-tinta/50">
                <FiUsers className="h-3.5 w-3.5" />
                {comunidad.miembros.length} miembro{comunidad.miembros.length === 1 ? '' : 's'} · Creada por{' '}
                {comunidad.creador.nombre}
              </p>
            </div>
            <JoinButton comunidadId={comunidad._id} esMiembro={esMiembro} onUpdate={setComunidad} />
          </div>
        </div>
      </div>

      {mostrarBannerPicker && (
        <BannerPicker onSelect={handleSeleccionarBanner} onClose={() => setMostrarBannerPicker(false)} />
      )}

      {esMiembro && (
        <Link
          to={`/comunidades/${comunidad._id}/publicar`}
          className="mt-4 flex items-center justify-center gap-2 rounded-2xl border border-dashed border-arcilla bg-white/40 px-4 py-3 text-sm font-medium text-tinta/60 transition hover:bg-white/60"
        >
          <FiPlus className="h-4 w-4" /> Publicar en esta comunidad
        </Link>
      )}

      <h2 className="mb-4 mt-8 font-display text-lg font-semibold text-tinta">Muro</h2>

      {cargandoPosts && <p className="text-tinta/50">Cargando publicaciones...</p>}

      {!cargandoPosts && posts.length === 0 && (
        <p className="text-tinta/50">Todavía no hay publicaciones en esta comunidad.</p>
      )}

      <div className="flex flex-col gap-4">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>

      <h2 className="mb-4 mt-8 font-display text-lg font-semibold text-tinta">Miembros</h2>

      <div className="flex flex-col gap-2">
        {comunidad.miembros.map((m) => (
          <div
            key={m._id}
            className="flex items-center gap-3 rounded-xl border border-arcilla bg-white/40 px-4 py-2.5"
          >
            {m.fotoUrl ? (
              <img src={m.fotoUrl} alt={m.nombre} className="h-8 w-8 rounded-full object-cover" />
            ) : (
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-verde/15 text-sm font-semibold text-verde">
                {m.nombre.charAt(0).toUpperCase()}
              </span>
            )}
            <span className="text-sm font-medium text-tinta">{m.nombre}</span>
          </div>
        ))}
      </div>
    </main>
  );
}