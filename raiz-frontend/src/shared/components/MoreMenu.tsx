import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../features/auth/store/authStore';
import { logoutUsuario } from '../../features/auth/services/auth.services';
import { useCategoryFilterStore } from '../../features/feed/store/categoryFilterStore';
import type { TipoPost } from '../../features/postCultura/schema/post.schema';

const MORE_ITEMS: { icon: string; label: string; key: string; tipo: TipoPost | null; disabled?: boolean }[] = [
  { icon: '✋', label: 'Colaboraciones', key: 'colaboraciones', tipo: 'colaboracion' },
  { icon: '🌾', label: 'Donaciones', key: 'donaciones', tipo: 'donacion' },
  { icon: '📌', label: 'Guardados', key: 'guardados', tipo: null, disabled: true },
  { icon: '💚', label: 'Comunidad', key: 'comunidad', tipo: null, disabled: true },
  { icon: '📖', label: 'Acerca de', key: 'acerca', tipo: null, disabled: true },
];

interface MoreMenuProps {
  onClose: () => void;
}

export function MoreMenu({ onClose }: MoreMenuProps) {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const setTipo = useCategoryFilterStore((state) => state.setTipo);
  const navigate = useNavigate();

  async function handleLogout() {
    await logoutUsuario();
    setUser(null);
    onClose();
    navigate('/feed');
  }

  function handleItemClick(item: (typeof MORE_ITEMS)[number]) {
    if (item.disabled) return;
    setTipo(item.tipo);
    onClose();
  }

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-tinta/20 md:hidden"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="fixed inset-x-0 bottom-16 z-50 rounded-t-2xl border-t border-arcilla bg-papel p-3 shadow-lg md:hidden">
        <div className="grid grid-cols-3 gap-2">
          {MORE_ITEMS.map((item) => (
            <button
              key={item.key}
              onClick={() => handleItemClick(item)}
              disabled={item.disabled}
              title={item.disabled ? 'Próximamente' : undefined}
              className={`flex flex-col items-center gap-1 rounded-xl px-2 py-3 text-xs font-medium ${
                item.disabled
                  ? 'cursor-not-allowed text-tinta/30'
                  : 'text-tinta/70 hover:bg-arcilla/30'
              }`}
            >
              <span className={item.disabled ? 'text-xl opacity-50' : 'text-xl'}>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </div>

        <div className="mt-2 border-t border-arcilla pt-2">
          {user ? (
            <button
              onClick={handleLogout}
              className="w-full rounded-xl px-3 py-2.5 text-left text-sm font-medium text-terracota hover:bg-arcilla/30"
            >
              Cerrar sesión
            </button>
          ) : (
            <Link
              to="/login"
              onClick={onClose}
              className="block w-full rounded-xl bg-verde px-3 py-2.5 text-center text-sm font-semibold text-papel hover:bg-verde-light"
            >
              Iniciar sesión
            </Link>
          )}
        </div>
      </div>
    </>
  );
}