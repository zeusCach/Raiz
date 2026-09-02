import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreatePost } from '../../hooks/useCreatePost';
import type { TipoPost } from '../../schema/post.schema';
import type { CrearPostCulturaPayload } from '../../types/postCultura.types';

const TIPOS: { value: TipoPost; label: string; icon: string }[] = [
  { value: 'foro', label: 'Foro', icon: '💬' },
  { value: 'reunion', label: 'Reunión', icon: '🤝' },
  { value: 'colaboracion', label: 'Colaboración', icon: '✋' },
  { value: 'donacion', label: 'Donación', icon: '🌾' },
];

export function PostForm() {
  const navigate = useNavigate();
  const { crearPost, loading, error } = useCreatePost();

  const [tipo, setTipo] = useState<TipoPost>('foro');
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagenUrl, setImagenUrl] = useState('');
  const [ubicacion, setUbicacion] = useState('');

  // campos específicos por tipo
  const [categoria, setCategoria] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [lugar, setLugar] = useState('');
  const [cupoMaximo, setCupoMaximo] = useState('');
  const [habilidades, setHabilidades] = useState('');
  const [metaDescripcion, setMetaDescripcion] = useState('');
  const [urgente, setUrgente] = useState(false);
  const [whatsapp, setWhatsapp] = useState('');

  const [formError, setFormError] = useState<string | null>(null);

  function construirPayload(): CrearPostCulturaPayload | null {
    if (!titulo.trim() || !descripcion.trim()) {
      setFormError('Título y descripción son obligatorios.');
      return null;
    }

    const base = { titulo, descripcion, imagenUrl: imagenUrl || undefined, ubicacion: ubicacion || undefined };

    switch (tipo) {
      case 'foro':
        if (!categoria.trim()) return setFormError('Selecciona una categoría.'), null;
        return { ...base, tipo, categoria };

      case 'reunion':
        if (!fecha || !hora || !lugar.trim() || !whatsapp.trim()) {
          setFormError('Fecha, hora, lugar y WhatsApp son obligatorios.');
          return null;
        }
        return {
          ...base,
          tipo,
          fecha,
          hora,
          lugar,
          cupoMaximo: cupoMaximo ? Number(cupoMaximo) : undefined,
          whatsappContacto: whatsapp,
        };

      case 'colaboracion':
        if (!habilidades.trim() || !whatsapp.trim()) {
          setFormError('Habilidades requeridas y WhatsApp son obligatorios.');
          return null;
        }
        return {
          ...base,
          tipo,
          habilidadesRequeridas: habilidades.split(',').map((h) => h.trim()).filter(Boolean),
          whatsappContacto: whatsapp,
        };

      case 'donacion':
        if (!metaDescripcion.trim() || !whatsapp.trim()) {
          setFormError('Descripción de la meta y WhatsApp son obligatorios.');
          return null;
        }
        return { ...base, tipo, metaDescripcion, whatsappContacto: whatsapp, urgente };
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);

    const payload = construirPayload();
    if (!payload) return;

    const nuevoPost = await crearPost(payload);
    if (nuevoPost) {
      navigate(`/post/${nuevoPost._id}`);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-xl px-8 py-8">
      <h1 className="font-display text-2xl font-bold text-tinta">Comparte algo</h1>

      {/* Selector de tipo */}
      <div className="mt-6 flex gap-2">
        {TIPOS.map((t) => (
          <button
            key={t.value}
            type="button"
            onClick={() => setTipo(t.value)}
            className={`flex-1 rounded-xl border px-3 py-2 text-sm font-medium transition ${
              tipo === t.value
                ? 'border-verde bg-verde/10 text-verde'
                : 'border-arcilla text-tinta/60 hover:bg-arcilla/20'
            }`}
          >
            <span className="mr-1">{t.icon}</span>
            {t.label}
          </button>
        ))}
      </div>

      {/* Campos comunes */}
      <div className="mt-6 flex flex-col gap-4">
        <div>
          <label className="text-sm font-medium text-tinta">Título</label>
          <input
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="mt-1 w-full rounded-xl border border-arcilla bg-white/60 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-verde/40"
            placeholder="Un título claro y directo"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-tinta">Descripción</label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            rows={4}
            className="mt-1 w-full rounded-xl border border-arcilla bg-white/60 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-verde/40"
            placeholder="Cuéntanos más detalles"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-tinta">Imagen (URL, opcional)</label>
          <input
            value={imagenUrl}
            onChange={(e) => setImagenUrl(e.target.value)}
            className="mt-1 w-full rounded-xl border border-arcilla bg-white/60 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-verde/40"
            placeholder="https://..."
          />
        </div>

        <div>
          <label className="text-sm font-medium text-tinta">Ubicación (opcional)</label>
          <input
            value={ubicacion}
            onChange={(e) => setUbicacion(e.target.value)}
            className="mt-1 w-full rounded-xl border border-arcilla bg-white/60 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-verde/40"
            placeholder="Felipe Carrillo Puerto"
          />
        </div>

        {/* Campos condicionales por tipo */}
        {tipo === 'foro' && (
          <div>
            <label className="text-sm font-medium text-tinta">Categoría</label>
            <input
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              className="mt-1 w-full rounded-xl border border-arcilla bg-white/60 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-verde/40"
              placeholder="tradición, lengua maya, gastronomía..."
            />
          </div>
        )}

        {tipo === 'reunion' && (
          <>
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="text-sm font-medium text-tinta">Fecha</label>
                <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-arcilla bg-white/60 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-verde/40" />
              </div>
              <div className="flex-1">
                <label className="text-sm font-medium text-tinta">Hora</label>
                <input type="time" value={hora} onChange={(e) => setHora(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-arcilla bg-white/60 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-verde/40" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-tinta">Lugar</label>
              <input value={lugar} onChange={(e) => setLugar(e.target.value)}
                className="mt-1 w-full rounded-xl border border-arcilla bg-white/60 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-verde/40"
                placeholder="Casa Ejidal, parque..." />
            </div>
            <div>
              <label className="text-sm font-medium text-tinta">Cupo máximo (opcional)</label>
              <input type="number" value={cupoMaximo} onChange={(e) => setCupoMaximo(e.target.value)}
                className="mt-1 w-full rounded-xl border border-arcilla bg-white/60 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-verde/40" />
            </div>
          </>
        )}

        {tipo === 'colaboracion' && (
          <div>
            <label className="text-sm font-medium text-tinta">Habilidades requeridas</label>
            <input value={habilidades} onChange={(e) => setHabilidades(e.target.value)}
              className="mt-1 w-full rounded-xl border border-arcilla bg-white/60 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-verde/40"
              placeholder="fotografía, redacción, edición (separadas por coma)" />
          </div>
        )}

        {tipo === 'donacion' && (
          <>
            <div>
              <label className="text-sm font-medium text-tinta">¿Qué se necesita?</label>
              <input value={metaDescripcion} onChange={(e) => setMetaDescripcion(e.target.value)}
                className="mt-1 w-full rounded-xl border border-arcilla bg-white/60 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-verde/40"
                placeholder="Material, dinero, mano de obra..." />
            </div>
            <label className="flex items-center gap-2 text-sm text-tinta">
              <input type="checkbox" checked={urgente} onChange={(e) => setUrgente(e.target.checked)} />
              Marcar como urgente
            </label>
          </>
        )}

        {(tipo === 'reunion' || tipo === 'colaboracion' || tipo === 'donacion') && (
          <div>
            <label className="text-sm font-medium text-tinta">WhatsApp de contacto</label>
            <input value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)}
              className="mt-1 w-full rounded-xl border border-arcilla bg-white/60 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-verde/40"
              placeholder="529831234567" />
          </div>
        )}
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
        {loading ? 'Publicando...' : 'Publicar'}
      </button>
    </form>
  );
}