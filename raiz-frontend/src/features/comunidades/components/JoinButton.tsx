import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../auth/store/authStore';
import { unirseComunidad, salirComunidad } from '../services/comunidad.api';
import type { ComunidadDetalle } from '../types/comunidad.types';

interface JoinButtonProps {
  comunidadId: string;
  esMiembro: boolean;
  onUpdate: (comunidad: ComunidadDetalle) => void;
}

export function JoinButton({ comunidadId, esMiembro, onUpdate }: JoinButtonProps) {
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function toggle() {
    if (!user) {
      navigate('/login');
      return;
    }
    setLoading(true);
    try {
      const actualizado = esMiembro
        ? await salirComunidad(comunidadId)
        : await unirseComunidad(comunidadId);
      onUpdate(actualizado);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={toggle}
      disabled={loading}
      className={`rounded-full px-4 py-2 text-sm font-semibold transition disabled:opacity-50 ${
        esMiembro
          ? 'border border-arcilla text-tinta/70 hover:bg-arcilla/30'
          : 'bg-verde text-papel hover:bg-verde-light'
      }`}
    >
      {esMiembro ? 'Unido' : 'Unirse'}
    </button>
  );
}