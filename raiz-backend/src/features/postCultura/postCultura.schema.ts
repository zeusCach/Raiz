import { z } from 'zod';

const baseFields = {
  titulo: z.string().trim().min(3, 'El título debe tener al menos 3 caracteres').max(150),
  descripcion: z.string().trim().min(1, 'La descripción es obligatoria').max(3000),
  imagenUrl: z.string().url('URL de imagen inválida').optional().or(z.literal('')),
  ubicacion: z.string().trim().max(150).optional(),
  comunidadId: z.string().optional(),
};

const whatsapp = z.string().trim().min(7, 'Número de WhatsApp inválido').max(20);

export const crearPostSchema = z.discriminatedUnion('tipo', [
  z.object({
    tipo: z.literal('foro'),
    ...baseFields,
    categoria: z.string().trim().min(1, 'Selecciona una categoría').max(50),
  }),
  z.object({
    tipo: z.literal('reunion'),
    ...baseFields,
    fecha: z.string().min(1, 'La fecha es obligatoria'),
    hora: z.string().min(1, 'La hora es obligatoria'),
    lugar: z.string().trim().min(1, 'El lugar es obligatorio').max(150),
    cupoMaximo: z.number().int().positive().optional(),
    whatsappContacto: whatsapp,
  }),
  z.object({
    tipo: z.literal('colaboracion'),
    ...baseFields,
    habilidadesRequeridas: z.array(z.string().trim().min(1).max(50)).min(1, 'Agrega al menos una habilidad'),
    whatsappContacto: whatsapp,
  }),
  z.object({
    tipo: z.literal('donacion'),
    ...baseFields,
    metaDescripcion: z.string().trim().min(1, 'Describe qué se necesita').max(500),
    whatsappContacto: whatsapp,
    urgente: z.boolean().optional(),
  }),
]);

export const editarPostSchema = z.object({
  titulo: z.string().trim().min(3).max(150).optional(),
  descripcion: z.string().trim().min(1).max(3000).optional(),
  imagenUrl: z.string().url('URL de imagen inválida').optional().or(z.literal('')),
  ubicacion: z.string().trim().max(150).optional(),
});