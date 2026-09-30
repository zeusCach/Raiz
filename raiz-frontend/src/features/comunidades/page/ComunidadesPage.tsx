import { Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import { useComunidades } from '../hooks/useComunidades';
import { ComunidadCard } from '../components/ComunidadCard';

export function ComunidadesPage() {
  const { comunidades, loading, error } = useComunidades();

  return (
    <main className="mx-auto max-w-2xl px-4 py-6 md:px-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-tinta md:text-3xl">Comunidades</h1>
          <p className="mt-1 text-sm text-tinta/60">
            Únete o crea espacios para organizarte con tu gente.
          </p>
        </div>
        <Link
          to="/comunidades/crear"
          className="flex items-center gap-1.5 rounded-full bg-verde px-4 py-2 text-sm font-semibold text-papel hover:bg-verde-light"
        >
          <FiPlus className="h-4 w-4" /> Crear
        </Link>
      </div>

      {loading && <p className="text-tinta/50">Cargando comunidades...</p>}

      {error && (
        <div className="rounded-xl border border-terracota/30 bg-terracota/10 px-4 py-3 text-terracota">
          {error}
        </div>
      )}

      {!loading && !error && comunidades.length === 0 && (
        <div className="rounded-xl border border-arcilla bg-white/40 px-4 py-8 text-center text-tinta/50">
          Todavía no hay comunidades. Sé la primera persona en crear una.
        </div>
      )}

      <div className="flex flex-col gap-4">
        {comunidades.map((c) => (
          <ComunidadCard key={c._id} comunidad={c} />
        ))}
      </div>
    </main>
  );
}