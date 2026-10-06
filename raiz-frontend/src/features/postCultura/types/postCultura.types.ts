import type { TipoPost } from '../schema/post.schema';

interface PostCulturaBase {
  _id: string;
  tipo: TipoPost;
  titulo: string;
  descripcion: string;
  autor: {
    _id: string;
    nombre: string;
    avatarUrl?: string;
  };
  imagenUrl?: string;
  ubicacion?: string;
  comunidadId?: string;
  comunidadNombre?: string;
  createdAt: string;
  updatedAt: string;
  comunidadCreadorId?: string;
}

export interface ForoPost extends PostCulturaBase {
  tipo: 'foro';
  categoria: string;
  comentariosCount: number;
}

export interface ReunionPost extends PostCulturaBase {
  tipo: 'reunion';
  fecha: string;
  hora: string;
  lugar: string;
  cupoMaximo?: number;
  whatsappContacto: string;
}

export interface ColaboracionPost extends PostCulturaBase {
  tipo: 'colaboracion';
  habilidadesRequeridas: string[];
  whatsappContacto: string;
  vigenteHasta?: string;
}

export interface DonacionPost extends PostCulturaBase {
  tipo: 'donacion';
  metaDescripcion: string;
  whatsappContacto: string;
  urgente?: boolean;
}

export type PostCultura = ForoPost | ReunionPost | ColaboracionPost | DonacionPost;

export type CrearPostCulturaPayload =
  | Omit<ForoPost, '_id' | 'autor' | 'createdAt' | 'updatedAt' | 'comentariosCount' | 'comunidadNombre'>
  | Omit<ReunionPost, '_id' | 'autor' | 'createdAt' | 'updatedAt' | 'comunidadNombre'>
  | Omit<ColaboracionPost, '_id' | 'autor' | 'createdAt' | 'updatedAt' | 'comunidadNombre'>
  | Omit<DonacionPost, '_id' | 'autor' | 'createdAt' | 'updatedAt' | 'comunidadNombre'>;