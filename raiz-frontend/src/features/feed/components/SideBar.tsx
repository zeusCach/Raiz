import { useCategoryFilterStore } from '../store/categoryFilterStore';
import type { TipoPost } from '../../postCultura/schema/post.schema';

const NAV_ITEMS: { icon: string; label: string; key: string; tipo: TipoPost | null }[] = [
  { icon: '🏠', label: 'Inicio', key: 'inicio', tipo: null },
  { icon: '💬', label: 'Foro', key: 'foro', tipo: 'foro' },
  { icon: '🤝', label: 'Reuniones', key: 'reuniones', tipo: 'reunion' },
  { icon: '✋', label: 'Colaboraciones', key: 'colaboraciones', tipo: 'colaboracion' },
  { icon: '🌾', label: 'Donaciones', key: 'donaciones', tipo: 'donacion' },
];

const OTROS_ITEMS = [
  { icon: '📌', label: 'Guardados', key: 'guardados' },
  { icon: '💚', label: 'Comunidad', key: 'comunidad' },
  { icon: '📖', label: 'Acerca de', key: 'acerca' },
];

export function Sidebar() {
  const tipoActivo = useCategoryFilterStore((state) => state.tipo);
  const setTipo = useCategoryFilterStore((state) => state.setTipo);

  return (
    <aside className="hidden w-56 flex-col justify-between border-r border-arcilla bg-papel px-3 py-6 md:flex">
      <nav className="flex flex-col gap-1">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.key}
            onClick={() => setTipo(item.tipo)}
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
              tipoActivo === item.tipo
                ? 'bg-verde text-papel'
                : 'text-tinta/70 hover:bg-arcilla/40'
            }`}
          >
            <span>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      <div className="border-t border-arcilla pt-4">
        <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wide text-tinta/40">
          Otros
        </p>
        <nav className="flex flex-col gap-1">
          {OTROS_ITEMS.map((item) => (
            <button
              key={item.key}
              disabled
              title="Próximamente"
              className="flex cursor-not-allowed items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-tinta/30"
            >
              <span className="opacity-50">{item.icon}</span>
              {item.label}
              <span className="ml-auto text-[10px] uppercase tracking-wide text-tinta/30">
                Pronto
              </span>
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
}