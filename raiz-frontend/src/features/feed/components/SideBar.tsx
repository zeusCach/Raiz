import { useState } from 'react';

const NAV_ITEMS = [
  { icon: '🏠', label: 'Inicio', key: 'inicio' },
  { icon: '💬', label: 'Foro', key: 'foro' },
  { icon: '🤝', label: 'Reuniones', key: 'reuniones' },
  { icon: '✋', label: 'Colaboraciones', key: 'colaboraciones' },
  { icon: '🌾', label: 'Donaciones', key: 'donaciones' },
  { icon: '📌', label: 'Guardados', key: 'guardados' },
];

const OTROS_ITEMS = [
  { icon: '💚', label: 'Comunidad', key: 'comunidad' },
  { icon: '📖', label: 'Acerca de', key: 'acerca' },
];

export function Sidebar() {
  const [activo, setActivo] = useState('inicio');

  return (
    <aside className="flex w-56 flex-col justify-between border-r border-arcilla bg-papel px-3 py-6">
      <nav className="flex flex-col gap-1">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.key}
            onClick={() => setActivo(item.key)}
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
              activo === item.key
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
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-tinta/70 hover:bg-arcilla/40"
            >
              <span>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
}