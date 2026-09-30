import { useParams } from 'react-router-dom';
import { FiUsers } from 'react-icons/fi';
import { useComunidad } from '../hooks/useComunidad';
import { JoinButton } from '../components/JoinButton';
import { useAuthStore } from '../../auth/store/authStore';

export function ComunidadDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { comunidad, loading, error, setComunidad } = useComunidad(id);
  const user = useAuthStore((state) => state.user);

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

  return (
    <main className="mx-auto max-w-2xl px-4 py-6 md:px-8">
      <div className="rounded-2xl border border-arcilla bg-white/60 p-6">
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