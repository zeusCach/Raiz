import { Link } from "react-router-dom";
import { FaGraduationCap } from "react-icons/fa";
import { FiHeart, FiBookmark, FiBookOpen } from "react-icons/fi";
import { useAuthStore } from "../../auth/store/authStore";

const OTROS_DESHABILITADOS = [
  { Icon: FiBookmark, label: "Guardados", key: "guardados" },
  { Icon: FiBookOpen, label: "Acerca de", key: "acerca" },
  { Icon: FiBookOpen, label: 'Acerca de', key: 'acerca' },
];

export function Sidebar() {
  const user = useAuthStore((state) => state.user);

  return (
    <aside className="hidden w-64 flex-col gap-4 border-r border-arcilla bg-papel px-4 py-6 md:flex">
      {user ? (
        <div className="rounded-2xl border border-arcilla bg-white/60 p-5 text-center">
          <Link to={`/perfil/${user._id}`}>
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-verde/15 font-display text-2xl font-semibold text-verde">
              {user.fotoUrl ? (
                <img
                  src={user.fotoUrl}
                  alt={user.nombre}
                  className="mx-auto h-16 w-16 rounded-full object-cover"
                />
              ) : (
                <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-verde/15 font-display text-2xl font-semibold text-verde">
                  {user.nombre.charAt(0).toUpperCase()}
                </span>
              )}
            </span>
          </Link>
          <h2 className="mt-3 font-display text-base font-semibold text-tinta">
            {user.nombre}
          </h2>

          {user.formacion ? (
            <p className="mt-1 flex items-center justify-center gap-1 text-xs text-tinta/60">
              <FaGraduationCap className="h-3.5 w-3.5" /> {user.formacion}
            </p>
          ) : (
            <Link
              to={`/perfil/${user._id}`}
              className="mt-1 flex items-center justify-center gap-1 text-xs text-tinta/50 hover:underline"
            >
              <FaGraduationCap className="h-3.5 w-3.5" /> Agrega tu formación
              académica
            </Link>
          )}

          {user.intereses && user.intereses.length > 0 ? (
            <p className="mt-1 flex items-center justify-center gap-1 text-xs text-tinta/60">
              <FiHeart className="h-3.5 w-3.5" /> {user.intereses.join(", ")}
            </p>
          ) : (
            <Link
              to={`/perfil/${user._id}`}
              className="mt-1 flex items-center justify-center gap-1 text-xs text-tinta/50 hover:underline"
            >
              <FiHeart className="h-3.5 w-3.5" /> Agrega tus intereses
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
          <Link
            to="/guardados"
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-tinta/70 hover:bg-arcilla/40"
          >
            <FiBookmark className="h-4 w-4" />
            Guardados
          </Link>
          <Link
            to="/comunidades"
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-tinta/70 hover:bg-arcilla/40"
          >
            <FiHeart className="h-4 w-4" />
            Comunidades
          </Link>
          {OTROS_DESHABILITADOS.map(({ Icon, label, key }) => (
            <button
              key={key}
              disabled
              title="Próximamente"
              className="flex cursor-not-allowed items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-tinta/30"
            >
              <Icon className="h-4 w-4 opacity-50" />
              {label}
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
