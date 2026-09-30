import { Link } from 'react-router-dom';
import { FiUsers } from 'react-icons/fi';
import type { ComunidadResumen } from '../types/comunidad.types';

export function ComunidadCard({ comunidad}: { comunidad: ComunidadResumen }) {
  return (
    <Link
      to={`/comunidades/${comunidad._id}`}
      className="rounded-2xl border border-arcilla bg-white/60 p-5 transition hover:shadow-md"
    >
      <h3 className="font-display text-lg font-semibold text-tinta">{comunidad.nombre}</h3>
      <p className="mt-1 text-sm text-tinta/60">{comunidad.descripcion}</p>
      <p className="mt-3 flex items-center gap-1.5 text-xs text-tinta/50">
        <FiUsers className="h-3.5 w-3.5" />
        {comunidad.miembros.length} miembro{comunidad.miembros.length === 1 ? '' : 's'}
      </p>
    </Link>
  );
}