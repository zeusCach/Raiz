// features/postCultura/hooks/useDeletePost.ts
import { useState, useCallback } from 'react';
import { eliminarPost } from '../services/postCultura.api';

export function useDeletePost() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const eliminar = useCallback(async (id: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await eliminarPost(id);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al eliminar la publicación');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { eliminar, loading, error };
}