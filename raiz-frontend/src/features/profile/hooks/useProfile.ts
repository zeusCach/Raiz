// features/profile/hooks/useProfile.ts
import { useState, useEffect, useCallback } from 'react';
import { fetchPerfilPublico, type PerfilPublico } from '../../auth/services/auth.services';
import { fetchPosts } from '../../postCultura/services/postCultura.api';
import type { PostCultura } from '../../postCultura/types/postCultura.types';

export function useProfile(id: string | undefined) {
  //guardamos la información del perfil
  const [perfil, setPerfil] = useState<PerfilPublico | null>(null);

  //guardamos las publicaciones del usuario
  const [posts, setPosts] = useState<PostCultura[]>([]);

  //guardamos el estado de carga
  const [loading, setLoading] = useState(true);

  //guardamos el mensaje de error si ocurre algún problema
  const [error, setError] = useState<string | null>(null);

  const cargar = useCallback(async () => {
    //si no existe un id no realizamos la consulta
    if (!id) return;

    //activamos el estado de carga
    setLoading(true);

    //limpiamos cualquier error anterior
    setError(null);

    try {
      //obtenemos el perfil y sus publicaciones al mismo tiempo
      const [perfilData, postsData] = await Promise.all([
        fetchPerfilPublico(id),
        fetchPosts(undefined, id),
      ]);

      //guardamos la información del perfil
      setPerfil(perfilData);

      //guardamos las publicaciones obtenidas
      setPosts(postsData);

    } catch (err) {

      //guardamos el mensaje del error ocurrido al cargar el perfil
      setError(err instanceof Error ? err.message : 'Error al cargar el perfil');

    } finally {

      //desactivamos el estado de carga
      setLoading(false);

    }
  }, [id]);

  useEffect(() => {
    //cargamos la información cuando cambia el id del perfil
    // eslint-disable-next-line react-hooks/set-state-in-effect
    cargar();
  }, [cargar]);

  //devolvemos la información del perfil, sus publicaciones y los estados de carga y error
  return { perfil, posts, loading, error };
}