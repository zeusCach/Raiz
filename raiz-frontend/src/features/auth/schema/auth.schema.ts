
import { z } from 'zod';

export const registroSchema = z
  .object({
    nombreCompleto: z.string().min(3, 'Escribe tu nombre completo'),
    email: z.email('Ingresa un correo válido'),
    password: z.string().min(8, 'Mínimo 8 caracteres'),
    confirmPassword: z.string().min(8, 'Confirma tu contraseña'),
    aceptaTerminos: z
      .boolean()
      .refine((val) => val === true, { message: 'Debes aceptar los términos para continuar' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  });


  export const loginSchema = z.object({
    email: z.email("Ingresa un correo correcto"),
    password: z.string().min(1, "Ingresa tu contraseña"),
    remember: z.boolean().default(false),
  })

export type RegistroFormData = z.infer<typeof registroSchema>;
export type LoginFormData = z.infer<typeof loginSchema>