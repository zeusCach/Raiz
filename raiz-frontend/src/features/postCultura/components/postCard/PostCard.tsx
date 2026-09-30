// features/postCultura/components/postCard/PostCard.tsx — reemplaza el archivo completo
import { Link } from "react-router-dom";
import { WhatsAppButton } from "../../../whatsapp/components/whatsappButton";
import type { PostCultura } from "../../types/postCultura.types";
import { FollowButton } from "../../../profile/components/FollowButton";
import { FiCalendar, FiUsers } from "react-icons/fi";

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

export function PostCard({ post }: { post: PostCultura }) {
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
        {post.tipo === "donacion" && post.urgente && (
          <span className="text-xs font-semibold text-[#B85C38]">
            ● Urgente
          </span>
        )}
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
          {post.habilidadesRequeridas.map((h) => (
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
    </article>
  );
}