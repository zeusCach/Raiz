import { Link, useNavigate } from 'react-router-dom';
import { FaHandsHelping, FaHandHoldingHeart } from 'react-icons/fa';
import { FiBookmark, FiHeart, FiBookOpen } from 'react-icons/fi';
import { useAuthStore } from '../../features/auth/store/authStore';
import { logoutUsuario } from '../../features/auth/services/auth.services';
import { useCategoryFilterStore } from '../../features/feed/store/categoryFilterStore';
import type { TipoPost } from '../../features/postCultura/schema/post.schema';

const FILTER_ITEMS: {
  Icon: React.ComponentType<{ className?: string }>;
  label: string;
  key: string;
  tipo: TipoPost;
}[] = [
  { Icon: FaHandsHelping, label: 'Colaboraciones', key: 'colaboraciones', tipo: 'colaboracion' },
  { Icon: FaHandHoldingHeart, label: 'Donaciones', key: 'donaciones', tipo: 'donacion' },
];

const LINK_ITEMS = [
  { Icon: FiHeart, label: 'Comunidades', key: 'comunidades', to: '/comunidades' },
];

const DISABLED_ITEMS = [
  { Icon: FiBookmark, label: 'Guardados', key: 'guardados' },
  { Icon: FiBookOpen, label: 'Acerca de', key: 'acerca' },
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

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-tinta/20 md:hidden"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="fixed inset-x-0 bottom-16 z-50 rounded-t-2xl border-t border-arcilla bg-papel p-3 shadow-lg md:hidden">
        {user && (
          <Link
            to={`/perfil/${user._id}`}
            onClick={onClose}
            className="mb-2 flex items-center gap-3 rounded-xl border border-arcilla bg-white/60 px-3 py-2.5 hover:bg-white/80"
          >
            {user.fotoUrl ? (
              <img src={user.fotoUrl} alt={user.nombre} className="h-9 w-9 rounded-full object-cover" />
            ) : (
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-verde/15 text-sm font-semibold text-verde">
                {user.nombre.charAt(0).toUpperCase()}
              </span>
            )}
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-tinta">{user.nombre}</span>
              <span className="text-xs text-tinta/50">Ver mi perfil</span>
            </div>
          </Link>
        )}

        <div className="grid grid-cols-3 gap-2">
          {FILTER_ITEMS.map((item) => (
            <button
              key={item.key}
              onClick={() => {
                setTipo(item.tipo);
                onClose();
                navigate('/feed');
              }}
              className="flex flex-col items-center gap-1 rounded-xl px-2 py-3 text-xs font-medium text-tinta/70 hover:bg-arcilla/30"
            >
              <item.Icon className="h-5 w-5" />
              {item.label}
            </button>
          ))}

          {LINK_ITEMS.map((item) => (
            <Link
              key={item.key}
              to={item.to}
              onClick={onClose}
              className="flex flex-col items-center gap-1 rounded-xl px-2 py-3 text-xs font-medium text-tinta/70 hover:bg-arcilla/30"
            >
              <item.Icon className="h-5 w-5" />
              {item.label}
            </Link>
          ))}

          {DISABLED_ITEMS.map((item) => (
            <button
              key={item.key}
              disabled
              title="Próximamente"
              className="flex cursor-not-allowed flex-col items-center gap-1 rounded-xl px-2 py-3 text-xs font-medium text-tinta/30"
            >
              <item.Icon className="h-5 w-5 opacity-50" />
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