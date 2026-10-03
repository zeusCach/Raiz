import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiUsers } from 'react-icons/fi';
import { useBuscarUsuarios } from '../hooks/useBuscarUsuarios';
import { FollowButton } from '../components/FollowButton';

export function PersonasPage() {
  const [query, setQuery] = useState('');
  const { usuarios, loading } = useBuscarUsuarios(query);

  return (
    <main className="mx-auto max-w-2xl px-4 py-6 md:px-8">
      <div className="mb-6 flex items-center gap-2">
        <FiUsers className="h-6 w-6 text-verde" />
        <h1 className="font-display text-2xl font-bold text-tinta">Personas</h1>
      </div>

      <div className="relative mb-6">
        <FiSearch className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-tinta/40" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar por nombre..."
          className="w-full rounded-full border border-arcilla bg-white/60 py-2.5 pl-11 pr-4 text-sm text-tinta focus:outline-none focus:ring-2 focus:ring-verde/40"
        />
      </div>

      {loading && <p className="text-center text-sm text-tinta/50">Buscando...</p>}

      {!loading && query.trim() && usuarios.length === 0 && (
        <p className="text-center text-sm text-tinta/50">
          No se encontraron personas con "{query}".
        </p>
      )}

      {!loading && !query.trim() && (
        <p className="text-center text-sm text-tinta/50">
          Escribe un nombre para empezar a buscar.
        </p>
      )}

      <div className="flex flex-col gap-2">
        {usuarios.map((u) => (
          <div
            key={u._id}
            className="flex items-center justify-between gap-3 rounded-xl border border-arcilla bg-white/60 px-4 py-3"
          >
            <Link to={`/perfil/${u._id}`} className="flex min-w-0 items-center gap-3">
              {u.fotoUrl ? (
                <img src={u.fotoUrl} alt={u.nombre} className="h-10 w-10 shrink-0 rounded-full object-cover" />
              ) : (
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-verde/15 text-sm font-semibold text-verde">
                  {u.nombre.charAt(0).toUpperCase()}
                </span>
              )}
              <span className="truncate text-sm font-medium text-tinta">{u.nombre}</span>
            </Link>
            <FollowButton perfilId={u._id} size="sm" />
          </div>
        ))}
      </div>
    </main>
  );
}