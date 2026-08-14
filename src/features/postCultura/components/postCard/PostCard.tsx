import { WhatsAppButton } from "../../../whatsapp/components/whatsappButton";
import type { PostCultura } from "../../types/postCultura.types";


const BADGE_STYLES: Record<PostCultura['tipo'], string> = {
  foro: 'bg-[#8B7355]/10 text-[#8B7355]',        // arcilla
  reunion: 'bg-[#4A6741]/10 text-[#4A6741]',      // verde
  colaboracion: 'bg-[#C89B3C]/10 text-[#C89B3C]', // ocre
  donacion: 'bg-[#B85C38]/10 text-[#B85C38]',     // terracota/urgente
};

const BADGE_LABEL: Record<PostCultura['tipo'], string> = {
  foro: 'Foro',
  reunion: 'Reunión',
  colaboracion: 'Colaboración',
  donacion: 'Donación',
};

export function PostCard({ post }: { post: PostCultura }) {
  return (
    <article className="rounded-2xl border border-[#E8DCC8] bg-[#FAF6EE] p-5 shadow-sm transition hover:shadow-md">
      <div className="mb-3 flex items-center justify-between">
        <span className={`rounded-full px-3 py-1 text-xs font-medium ${BADGE_STYLES[post.tipo]}`}>
          {BADGE_LABEL[post.tipo]}
        </span>
        {post.tipo === 'donacion' && post.urgente && (
          <span className="text-xs font-semibold text-[#B85C38]">● Urgente</span>
        )}
      </div>

      {post.imagenUrl && (
        <img src={post.imagenUrl} alt={post.titulo} className="mb-3 h-55 w-full rounded-xl object-cover" />
      )}

      <h3 className="font-serif text-lg font-semibold text-[#3A3226]">{post.titulo}</h3>
      <p className="mt-1 text-sm text-[#6B5F4E]">{post.descripcion}</p>

      {post.tipo === 'reunion' && (
        <p className="mt-3 text-sm text-[#4A6741]">
          📅 {new Date(post.fecha).toLocaleDateString('es-MX')} · {post.hora} · {post.lugar}
        </p>
      )}

      {post.tipo === 'colaboracion' && (
        <div className="mt-3 flex flex-wrap gap-1">
          {post.habilidadesRequeridas.map((h) => (
            <span key={h} className="rounded-md bg-[#E8DCC8] px-2 py-0.5 text-xs text-[#3A3226]">
              {h}
            </span>
          ))}
        </div>
      )}

      <div className="mt-4 flex items-center justify-between border-t border-[#E8DCC8] pt-3">
        <span className="text-xs text-[#8A7D68]">{post.autor.nombre}</span>
        {(post.tipo === 'reunion' || post.tipo === 'colaboracion' || post.tipo === 'donacion') && (
          <WhatsAppButton
            numero={post.whatsappContacto}
            mensaje={`Hola, vi tu publicación "${post.titulo}" en Raíz`}
          />
        )}
      </div>
    </article>
  );
}