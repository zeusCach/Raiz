import { z } from 'zod';

export const registroSchema = z.object({
  nombreCompleto: z.string().trim().min(3, 'El nombre debe tener al menos 3 caracteres').max(100),
  email: z.string().trim().email('Correo inválido').max(150),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres').max(72),
});

export const loginSchema = z.object({
  email: z.string().trim().email('Correo inválido'),
  password: z.string().min(1, 'La contraseña es obligatoria'),
});

export const actualizarPerfilSchema = z.object({
  bio: z.string().trim().max(200, 'La descripción no puede superar 200 caracteres').optional(),
  formacion: z.string().trim().max(150).optional(),
  intereses: z.array(z.string().trim().max(30)).max(10, 'Máximo 10 intereses').optional(),
  fotoUrl: z.string().max(2_000_000, 'La imagen es demasiado grande').optional(),
  bannerUrl: z.string().url('URL de banner inválida').max(500).optional().or(z.literal('')),
});