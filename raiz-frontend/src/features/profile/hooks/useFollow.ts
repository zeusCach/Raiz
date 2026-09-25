// features/profile/hooks/useFollow.ts
import { useState } from 'react';
import { seguirUsuario, dejarDeSeguirUsuario } from '../../auth/services/auth.services';
import { useAuthStore } from '../../auth/store/authStore';

export function useFollow(perfilId: string) {
  //obtenemos el usuario que tiene la sesión activa
  const user = useAuthStore((state) => state.user);

  //obtenemos la función para actualizar los datos del usuario
  const setUser = useAuthStore((state) => state.setUser);

  //guardamos el estado de carga mientras se realiza la acción
  const [loading, setLoading] = useState(false);

  //verificamos si el usuario actual ya sigue al perfil
  const siguiendo = user?.siguiendo.includes(perfilId) ?? false;

  //verificamos si el perfil pertenece al mismo usuario
  const esUnoMismo = user?._id === perfilId;

  async function toggleSeguir() {
    //si no hay una sesión activa no realizamos ninguna acción
    if (!user) return;

    //activamos el estado de carga
    setLoading(true);

    try {
      //si ya sigue al usuario dejamos de seguirlo, de lo contrario comenzamos a seguirlo
      const nuevaLista = siguiendo
        ? await dejarDeSeguirUsuario(perfilId)
        : await seguirUsuario(perfilId);

      //actualizamos la lista de usuarios que sigue
      setUser({ ...user, siguiendo: nuevaLista });

    } catch {
      //silenciamos el error para que el botón simplemente no cambie de estado
    } finally {
      //desactivamos el estado de carga
      setLoading(false);
    }
  }

  //devolvemos los estados y la función para controlar el seguimiento
  return { siguiendo, esUnoMismo, loading, toggleSeguir, haySesion: !!user };
}