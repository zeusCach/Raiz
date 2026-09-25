// features/profile/components/FollowButton.tsx
import { useNavigate } from 'react-router-dom';
import { useFollow } from '../hooks/useFollow';

interface FollowButtonProps {
  perfilId: string;
  size?: 'sm' | 'md';
}

export function FollowButton({ perfilId, size = 'md' }: FollowButtonProps) {
  const { siguiendo, esUnoMismo, loading, toggleSeguir, haySesion } = useFollow(perfilId);
  const navigate = useNavigate();

  if (esUnoMismo) return null;

  const base =
    size === 'sm'
      ? 'rounded-full px-3 py-1 text-xs font-medium'
      : 'rounded-full px-4 py-2 text-sm font-semibold';

  if (!haySesion) {
    return (
      <button
        onClick={() => navigate('/login')}
        className={`${base} border border-arcilla text-tinta/70 hover:bg-arcilla/30`}
      >
        Seguir
      </button>
    );
  }

  return (
    <button
      onClick={toggleSeguir}
      disabled={loading}
      className={`${base} transition disabled:opacity-50 ${
        siguiendo
          ? 'border border-arcilla text-tinta/70 hover:bg-arcilla/30'
          : 'bg-verde text-papel hover:bg-verde-light'
      }`}
    >
      {siguiendo ? 'Siguiendo' : 'Seguir'}
    </button>
  );
}