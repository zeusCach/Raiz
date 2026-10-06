import { useState } from "react";
import { Link } from "react-router-dom";
import { FiCalendar, FiUsers, FiMoreVertical } from "react-icons/fi";
import { useAuthStore } from "../../../auth/store/authStore";
import { useDeletePost } from "../../hooks/useDeletePost";
import { SaveButton } from "./SaveButton";
import { WhatsAppButton } from "../../../whatsapp/components/whatsappButton";
import { FollowButton } from "../../../profile/components/FollowButton";
import { EditPostModal } from "../EditPostModal";
import type { PostCultura } from "../../types/postCultura.types";

const BADGE_STYLES: Record<PostCultura["tipo"], string> = {
  foro: "bg-[#8B7355]/10 text-[#8B7355]",
  reunion: "bg-[#4A6741]/10 text-[#4A6741]",
  colaboracion: "bg-[#C89B3C]/10 text-[#C89B3C]",
  donacion: "bg-[#B85C38]/10 text-[#B85C38]",
};

const BADGE_LABEL: Record<PostCultura["tipo"], string> = {
  foro: "Foro",
  reunion: "Reunión",
  colaboracion: "Colaboración",
  donacion: "Donación",
};

interface PostCardProps {
  post: PostCultura;
  onDeleted?: (id: string) => void;
}

export function PostCard({ post: postInicial, onDeleted }: PostCardProps) {
  const [post, setPost] = useState(postInicial);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [editando, setEditando] = useState(false);
  const user = useAuthStore((state) => state.user);
  const { eliminar, loading: eliminando } = useDeletePost();

  // El frontend solo puede inferir "soy el autor" con certeza; el permiso real
  // de moderador de comunidad se valida siempre en el backend al intentar la acción.

  const esAutor = user?._id === post.autor._id;
  const esCreadorComunidad =
    !!user && !!post.comunidadCreadorId && user._id === post.comunidadCreadorId;
  const puedeModificar = esAutor || esCreadorComunidad;

  async function handleEliminar() {
    if (
      !confirm(
        "¿Seguro que quieres eliminar esta publicación? Esta acción no se puede deshacer.",
      )
    ) {
      return;
    }
    const exito = await eliminar(post._id);
    if (exito) {
      onDeleted?.(post._id);
    }
    setMenuAbierto(false);
  }

  return (
    <article className="rounded-2xl border border-[#E8DCC8] bg-[#FAF6EE] p-5 shadow-sm transition hover:shadow-md">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${BADGE_STYLES[post.tipo]}`}
          >
            {BADGE_LABEL[post.tipo]}
          </span>
          {post.comunidadNombre && post.comunidadId && (
            <Link
              to={`/comunidades/${post.comunidadId}`}
              className="flex items-center gap-1 rounded-full bg-verde/10 px-3 py-1 text-xs font-medium text-verde hover:bg-verde/20"
            >
              <FiUsers className="h-3 w-3" />
              {post.comunidadNombre}
            </Link>
          )}
        </div>
        <div className="relative flex items-center gap-1.5">
          {post.tipo === "donacion" && post.urgente && (
            <span className="text-xs font-semibold text-[#B85C38]">
              ● Urgente
            </span>
          )}
          <SaveButton postId={post._id} />
          {user && puedeModificar && (
            <>
              <button
                onClick={() => setMenuAbierto((v) => !v)}
                className="rounded-full p-1.5 text-tinta/40 hover:bg-arcilla/30 hover:text-tinta/70"
              >
                <FiMoreVertical className="h-4 w-4" />
              </button>
              {menuAbierto && (
                <div className="absolute right-0 top-8 z-10 w-36 rounded-xl border border-arcilla bg-papel py-1 shadow-lg">
                  {esAutor && (
                    <button
                      onClick={() => {
                        setEditando(true);
                        setMenuAbierto(false);
                      }}
                      className="block w-full px-3 py-2 text-left text-sm text-tinta hover:bg-arcilla/30"
                    >
                      Editar
                    </button>
                  )}
                  <button
                    onClick={handleEliminar}
                    disabled={eliminando}
                    className="block w-full px-3 py-2 text-left text-sm text-terracota hover:bg-arcilla/30 disabled:opacity-50"
                  >
                    {eliminando ? "Eliminando..." : "Eliminar"}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {post.imagenUrl && (
        <img
          src={post.imagenUrl}
          alt={post.titulo}
          className="mb-3 h-55 w-full rounded-xl object-cover"
        />
      )}
      <h3 className="font-serif text-lg font-semibold text-[#3A3226]">
        {post.titulo}
      </h3>
      <p className="mt-1 text-sm text-[#6B5F4E]">{post.descripcion}</p>
      {post.tipo === "reunion" && (
        <p className="mt-3 flex items-center gap-1.5 text-sm text-[#4A6741]">
          <FiCalendar className="h-4 w-4" />
          {new Date(post.fecha).toLocaleDateString("es-MX")} · {post.hora} ·{" "}
          {post.lugar}
        </p>
      )}
      {post.tipo === "colaboracion" && (
        <div className="mt-3 flex flex-wrap gap-1">
          {post.habilidadesRequeridas.map((h: string) => (
            <span
              key={h}
              className="rounded-md bg-[#E8DCC8] px-2 py-0.5 text-xs text-[#3A3226]"
            >
              {h}
            </span>
          ))}
        </div>
      )}
      <div className="mt-4 flex items-center justify-between border-t border-[#E8DCC8] pt-3">
        <div className="flex items-center gap-2">
          {post.autor.avatarUrl ? (
            <img
              src={post.autor.avatarUrl}
              alt={post.autor.nombre}
              className="h-6 w-6 rounded-full object-cover"
            />
          ) : (
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-verde/15 text-[10px] font-semibold text-verde">
              {post.autor.nombre.charAt(0).toUpperCase()}
            </span>
          )}
          <Link
            to={`/perfil/${post.autor._id}`}
            className="text-xs font-medium text-[#8A7D68] hover:underline"
          >
            {post.autor.nombre}
          </Link>
          <FollowButton perfilId={post.autor._id} size="sm" />
        </div>
        {(post.tipo === "reunion" ||
          post.tipo === "colaboracion" ||
          post.tipo === "donacion") && (
          <WhatsAppButton
            numero={post.whatsappContacto}
            mensaje={`Hola, vi tu publicación "${post.titulo}" en Raíz`}
          />
        )}
      </div>

      {editando && (
        <EditPostModal
          post={post}
          onClose={() => setEditando(false)}
          onUpdated={(actualizado) => setPost(actualizado)}
        />
      )}
    </article>
  );
}
