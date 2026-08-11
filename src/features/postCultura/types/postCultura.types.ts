export type TipoPost = "foro" | "reunion" | "colaboracion" | "donacion";

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
  createdAt: string;
  updatedAt: string;
}


export interface ForoPost extends PostCulturaBase {
    tipo: 'foro';
    categoria: string; // ej. "tradicion", "gastronomia", "lengua maya"
    comentariosCount: number;
}


export interface ReunionPost extends PostCulturaBase {
  tipo: 'reunion';
   fecha: string;        // ISO date
  hora: string;
  lugar: string;
  cupoMaximo?: number;
  whatsappContacto: string; // número para confirmar asistencia
}

export interface ColaboracionPost extends PostCulturaBase {
  tipo: 'colaboracion';
  habilidadesRequeridas: string[];
  whatsappContacto: string;
  vigenteHasta?: string;
}

export interface DonacionPost extends PostCulturaBase {
  tipo: 'donacion';
  metaDescripcion: string;   // qué se necesita (dinero, especie, etc.)
  whatsappContacto: string;
  urgente?: boolean;
}

export type PostCultura = ForoPost | ReunionPost | ColaboracionPost | DonacionPost;

// Payload genérico para creación — se valida por tipo en el form
export type CrearPostCulturaPayload =
  | Omit<ForoPost, '_id' | 'autor' | 'createdAt' | 'updatedAt' | 'comentariosCount'>
  | Omit<ReunionPost, '_id' | 'autor' | 'createdAt' | 'updatedAt'>
  | Omit<ColaboracionPost, '_id' | 'autor' | 'createdAt' | 'updatedAt'>
  | Omit<DonacionPost, '_id' | 'autor' | 'createdAt' | 'updatedAt'>;