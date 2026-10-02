import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiBookmark } from 'react-icons/fi';
import { useAuthStore } from '../../../auth/store/authStore';
import { guardarPost, quitarGuardado } from '../../../auth/services/auth.services';

export function SaveButton({ postId }: { postId: string }) {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const estaGuardado = user?.guardados.includes(postId) ?? false;

  async function toggle() {
    if (!user) {
      navigate('/login');
      return;
    }
    setLoading(true);
    try {
      const nuevaLista = estaGuardado ? await quitarGuardado(postId) : await guardarPost(postId);
      setUser({ ...user, guardados: nuevaLista });
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={toggle}
      disabled={loading}
      title={estaGuardado ? 'Quitar de guardados' : 'Guardar'}
      className={`rounded-full p-1.5 transition disabled:opacity-50 ${
        estaGuardado ? 'text-ocre' : 'text-tinta/40 hover:text-tinta/70'
      }`}
    >
      <FiBookmark className="h-4 w-4" fill={estaGuardado ? 'currentColor' : 'none'} />
    </button>
  );
}