import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateComunidad } from '../hooks/useCreateComunidad';

export function CrearComunidadPage() {
  const navigate = useNavigate();
  const { crear, loading, error } = useCreateComunidad();
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);
    if (!nombre.trim() || !descripcion.trim()) {
      setFormError('Nombre y descripción son obligatorios.');
      return;
    }
    const comunidad = await crear(nombre, descripcion);
    if (comunidad) navigate(`/comunidades/${comunidad._id}`);
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-xl px-4 py-6 md:px-8 md:py-8">
      <h1 className="font-display text-2xl font-bold text-tinta">Crea una comunidad</h1>

      <div className="mt-6 flex flex-col gap-4">
        <div>
          <label className="text-sm font-medium text-tinta">Nombre</label>
          <input
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="mt-1 w-full rounded-xl border border-arcilla bg-white/60 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-verde/40"
            placeholder="Ej. Jóvenes por la cultura maya"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-tinta">Descripción</label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            rows={4}
            className="mt-1 w-full rounded-xl border border-arcilla bg-white/60 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-verde/40"
            placeholder="¿De qué trata esta comunidad?"
          />
        </div>
      </div>

      {(formError || error) && (
        <div className="mt-4 rounded-xl border border-terracota/30 bg-terracota/10 px-4 py-3 text-sm text-terracota">
          {formError || error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="mt-6 w-full rounded-full bg-verde px-4 py-2.5 text-sm font-semibold text-papel transition hover:bg-verde-light disabled:opacity-50"
      >
        {loading ? 'Creando...' : 'Crear comunidad'}
      </button>
    </form>
  );
}