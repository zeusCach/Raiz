import { z } from 'zod';

export const crearComunidadSchema = z.object({
  nombre: z.string().trim().min(3, 'El nombre debe tener al menos 3 caracteres').max(100),
  descripcion: z.string().trim().min(1, 'La descripción es obligatoria').max(500),
});

export const actualizarBannerSchema = z.object({
  bannerUrl: z.string().url('URL de banner inválida').max(500),
});