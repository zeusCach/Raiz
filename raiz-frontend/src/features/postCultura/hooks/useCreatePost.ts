import { useState, useCallback } from 'react';
import { createPost } from '../services/postCultura.api';
import { addStoredPost } from '../data/postsStore';
import type { CrearPostCulturaPayload, PostCultura } from '../types/postCultura.types';

const USE_MOCK = true;

export function useCreatePost() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const crearPost = useCallback(
    async (payload: CrearPostCulturaPayload): Promise<PostCultura | null> => {
        
    setLoading(true);
    setError(null);

    try {
      if (USE_MOCK) {
        await new Promise((r) => setTimeout(r, 300));
        return addStoredPost(payload);
      }
      return await createPost(payload);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear el post');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { crearPost, loading, error };
}