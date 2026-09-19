import { useState, useCallback } from 'react';
import { createPost } from '../services/postCultura.api';
import { addStoredPost } from '../data/postsStore';
import type { CrearPostCulturaPayload, PostCultura } from '../types/postCultura.types';
import { useAuthStore } from '../../auth/store/authStore';

const USE_MOCK = false;

// Autor de respaldo, en caos que authenticacion falle
const AUTOR_MOCK = {
  _id: '000000000000000000000001',
  nombre: 'Usuario Raíz',
};


export function useCreatePost() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const user = useAuthStore((state) => state.user);

  const crearPost = useCallback(
    async (payload: CrearPostCulturaPayload): Promise<PostCultura | null> => {
        
    setLoading(true);
    setError(null);

    try {
      
      const autor = user ? {_id: user._id, nombre: user.nombre} : AUTOR_MOCK;
      const payloadAutor = {...payload, autor};

      if (USE_MOCK) {
        await new Promise((r) => setTimeout(r, 300));
        return addStoredPost(payloadAutor);
      }
      return await createPost(payloadAutor);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear el post');
      return null;
    } finally {
      setLoading(false);
    }
  }, [user]);

  return { crearPost, loading, error };
}