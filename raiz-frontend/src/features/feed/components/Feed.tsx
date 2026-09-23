// features/feed/components/Feed.tsx
import { useMemo, useState } from "react";
import { PostCard } from "../../postCultura/components/postCard/PostCard";
import { usePosts } from "../../postCultura/hooks/usePosts";
import { useSearchStore } from "../store/searchStore";
import { CreatePostPrompt } from "../../postCultura/components/postCard/CreatePostPrompt";

type FeedTab = "descubrir" | "siguiendo";

export function Feed() {
  const [tab, setTab] = useState<FeedTab>("descubrir");
  const { posts, loading, error } = usePosts();
  const query = useSearchStore((state) => state.query);

  const postsFiltrados = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return posts;
    return posts.filter(
      (post) =>
        post.titulo.toLowerCase().includes(q) ||
        post.descripcion.toLowerCase().includes(q),
    );
  }, [posts, query]);

  return (
    <main className="flex-1 px-8 py-6">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-tinta md:text-3xl">
            Feed comunitario
          </h1>
          <p className="mt-1 text-sm text-tinta/60 md:text-base">
            Descubre lo que tu comunidad está compartiendo ahora.
          </p>
        </div>

        <div className="flex w-full rounded-full border border-arcilla bg-white/60 p-1 md:w-auto">
          <button
            onClick={() => setTab("descubrir")}
            className={`flex-1 rounded-full px-4 py-1.5 text-sm font-medium transition md:flex-none ${
              tab === "descubrir" ? "bg-verde text-papel" : "text-tinta/60"
            }`}
          >
            Descubrir
          </button>
          <button
            onClick={() => setTab("siguiendo")}
            className={`flex-1 rounded-full px-4 py-1.5 text-sm font-medium transition md:flex-none ${
              tab === "siguiendo" ? "bg-verde text-papel" : "text-tinta/60"
            }`}
          >
            Siguiendo
          </button>
        </div>
      </div>

      {loading && <p className="text-tinta/50">Cargando publicaciones...</p>}
      <CreatePostPrompt />
      {error && (
        <div className="rounded-xl border border-terracota/30 bg-terracota/10 px-4 py-3 text-terracota">
          No se pudieron cargar las publicaciones. {error}
        </div>
      )}

      {!loading && !error && postsFiltrados.length === 0 && (
        <div className="rounded-xl border border-arcilla bg-white/40 px-4 py-8 text-center text-tinta/50">
          {query
            ? `No se encontraron publicaciones para "${query}".`
            : "Todavía no hay publicaciones. Sé la primera persona en compartir algo."}
        </div>
      )}

      <div className="flex flex-col gap-4">
        {postsFiltrados.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </main>
  );
}
