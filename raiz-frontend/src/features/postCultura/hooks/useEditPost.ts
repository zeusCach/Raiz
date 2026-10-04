import { useState, useCallback } from 'react';
import { editarPost } from '../services/postCultura.api';
import type { PostCultura } from '../types/postCultura.types';

export function useEditPost() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const editar = useCallback(
    async (
      id: string,
      data: { titulo?: string; descripcion?: string; imagenUrl?: string; ubicacion?: string }
    ): Promise<PostCultura | null> => {
      setLoading(true);
      setError(null);
      try {
        return await editarPost(id, data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al editar la publicación');
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { editar, loading, error };
}