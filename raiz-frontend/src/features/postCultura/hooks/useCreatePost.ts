import { useState, useCallback } from 'react';
import { createPost } from '../services/postCultura.api';
import { addStoredPost } from '../data/postsStore';
import type { CrearPostCulturaPayload, PostCultura } from '../types/postCultura.types';

const USE_MOCK = false;

// Autor temporal mientras no existe auth real — reemplazar cuando haya sesión de usuario
const AUTOR_MOCK = {
  _id: '000000000000000000000001',
  nombre: 'Usuario Raíz',
};


export function useCreatePost() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const crearPost = useCallback(
    async (payload: CrearPostCulturaPayload): Promise<PostCultura | null> => {
        
    setLoading(true);
    setError(null);

    try {
      
      const payloadAutor = { ...payload, autor: AUTOR_MOCK };

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
  }, []);

  return { crearPost, loading, error };
}