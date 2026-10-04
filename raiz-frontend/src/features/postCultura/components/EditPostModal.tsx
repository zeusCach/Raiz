import { useState } from 'react';
import { FiX } from 'react-icons/fi';
import { useEditPost } from '../hooks/useEditPost';
import type { PostCultura } from '../types/postCultura.types';

interface EditPostModalProps {
  post: PostCultura;
  onClose: () => void;
  onUpdated: (post: PostCultura) => void;
}

export function EditPostModal({ post, onClose, onUpdated }: EditPostModalProps) {
  const { editar, loading, error } = useEditPost();
  const [titulo, setTitulo] = useState(post.titulo);
  const [descripcion, setDescripcion] = useState(post.descripcion);
  const [imagenUrl, setImagenUrl] = useState(post.imagenUrl ?? '');
  const [ubicacion, setUbicacion] = useState(post.ubicacion ?? '');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const actualizado = await editar(post._id, {
      titulo,
      descripcion,
      imagenUrl: imagenUrl || undefined,
      ubicacion: ubicacion || undefined,
    });
    if (actualizado) {
      onUpdated(actualizado);
      onClose();
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-tinta/40 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-2xl bg-papel p-5"
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-lg font-semibold text-tinta">Editar publicación</h3>
          <button type="button" onClick={onClose} className="rounded-full p-1.5 hover:bg-arcilla/30">
            <FiX className="h-5 w-5 text-tinta/60" />
          </button>
        </div>

        <div className="flex flex-col gap-3">
          <div>
            <label className="text-sm font-medium text-tinta">Título</label>
            <input
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="mt-1 w-full rounded-xl border border-arcilla bg-white/60 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-verde/40"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-tinta">Descripción</label>
            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              rows={4}
              className="mt-1 w-full rounded-xl border border-arcilla bg-white/60 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-verde/40"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-tinta">Imagen (URL, opcional)</label>
            <input
              value={imagenUrl}
              onChange={(e) => setImagenUrl(e.target.value)}
              className="mt-1 w-full rounded-xl border border-arcilla bg-white/60 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-verde/40"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-tinta">Ubicación (opcional)</label>
            <input
              value={ubicacion}
              onChange={(e) => setUbicacion(e.target.value)}
              className="mt-1 w-full rounded-xl border border-arcilla bg-white/60 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-verde/40"
            />
          </div>
        </div>

        {error && (
          <div className="mt-3 rounded-xl border border-terracota/30 bg-terracota/10 px-4 py-2 text-sm text-terracota">
            {error}
          </div>
        )}

        <div className="mt-4 flex gap-2">
          <button
            type="submit"
            disabled={loading}
            className="rounded-full bg-verde px-4 py-2 text-sm font-semibold text-papel transition hover:bg-verde-light disabled:opacity-50"
          >
            {loading ? 'Guardando...' : 'Guardar'}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-arcilla px-4 py-2 text-sm font-medium text-tinta hover:bg-arcilla/30"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}