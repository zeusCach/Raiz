export function RightSidebar() {
  return (
    <aside className="flex w-72 flex-col gap-4 p-6">
      <div className="rounded-2xl border border-arcilla bg-white/60 p-5">
        <h3 className="font-display text-lg font-semibold text-tinta">Comparte algo</h3>
        <p className="mt-1 text-sm text-tinta/60">
          Cuéntale a tu comunidad qué está pasando: un evento, una necesidad, una idea.
        </p>
        <button className="mt-4 w-full rounded-full bg-terracota px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-terracota/90">
          Iniciar sesión para publicar
        </button>
      </div>

      <div className="rounded-2xl border border-arcilla bg-white/60 p-5">
        <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-tinta">
          <span>✨</span> En tendencia
        </h3>
        <p className="mt-2 text-sm text-tinta/60">
          Las publicaciones con más apoyo de la comunidad aparecerán aquí.
        </p>
      </div>
    </aside>
  );
}