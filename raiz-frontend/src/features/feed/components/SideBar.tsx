import { Link } from "react-router-dom";
import { useAuthStore } from "../../auth/store/authStore";

const OTROS_ITEMS = [
  { icon: "📌", label: "Guardados", key: "guardados" },
  { icon: "💚", label: "Comunidad", key: "comunidad" },
  { icon: "📖", label: "Acerca de", key: "acerca" },
];

export function Sidebar() {
  const user = useAuthStore((state) => state.user);

  return (
    <aside className="hidden w-64 flex-col gap-4 border-r border-arcilla bg-papel px-4 py-6 md:flex">
      {user ? (
        <div className="rounded-2xl border border-arcilla bg-white/60 p-5 text-center">
          <Link to={`/perfil/${user._id}`}>
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-verde/15 font-display text-2xl font-semibold text-verde">
              {user.nombre.charAt(0).toUpperCase()}
            </span>
          </Link>
          <h2 className="mt-3 font-display text-base font-semibold text-tinta">
            {user.nombre}
          </h2>

          {/* Placeholder: aún no existe este campo en el modelo de usuario */}
          {user.formacion ? (
            <p className="mt-1 text-xs text-tinta/60">🎓 {user.formacion}</p>
          ) : (
            <Link
              to={`/perfil/${user._id}`}
              className="mt-1 block text-xs text-tinta/50 hover:underline"
            >
              🎓 Agrega tu formación académica
            </Link>
          )}

          {user.intereses && user.intereses.length > 0 ? (
            <p className="mt-1 text-xs text-tinta/60">
              💚 {user.intereses.join(", ")}
            </p>
          ) : (
            <Link
              to={`/perfil/${user._id}`}
              className="mt-1 block text-xs text-tinta/50 hover:underline"
            >
              💚 Agrega tus intereses
            </Link>
          )}
        </div>
      ) : (
        <div className="rounded-2xl border border-arcilla bg-white/60 p-5 text-center">
          <p className="text-sm text-tinta/60">
            Inicia sesión para ver tu perfil aquí.
          </p>
        </div>
      )}

      <div className="border-t border-arcilla pt-4">
        <p className="mb-2 px-1 text-xs font-semibold uppercase tracking-wide text-tinta/40">
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
