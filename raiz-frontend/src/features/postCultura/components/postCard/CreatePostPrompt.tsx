// features/postCultura/components/postCard/CreatePostPrompt.tsx
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../auth/store/authStore';

export function CreatePostPrompt() {
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  function handleClick() {
    navigate(user ? '/publicar' : '/login');
  }

  const inicial = user?.nombre?.charAt(0).toUpperCase() ?? '🌱';

  return (
    <button
      onClick={handleClick}
      className="mb-4 flex w-full items-center gap-3 rounded-2xl border border-arcilla bg-white/60 px-4 py-3 text-left transition hover:bg-white/80"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-verde/15 font-display text-lg font-semibold text-verde">
        {inicial}
      </span>
      <span className="flex-1 rounded-full border border-arcilla bg-papel px-4 py-2 text-sm text-tinta/50">
        {user ? '¿Qué está pasando en tu comunidad?' : 'Inicia sesión para compartir algo'}
      </span>
    </button>
  );
}