export interface ComunidadResumen {
  _id: string;
  nombre: string;
  descripcion: string;
  creador: string;
  miembros: string[];
  createdAt: string;
}

export interface MiembroComunidad {
  _id: string;
  nombre: string;
  fotoUrl?: string;
}

export interface ComunidadDetalle {
  _id: string;
  nombre: string;
  descripcion: string;
  creador: { _id: string; nombre: string };
  miembros: MiembroComunidad[];
  createdAt: string;
  bannerUrl: string;
}