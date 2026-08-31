import { Schema, model } from 'mongoose';

// Estructura del autor como subdocumento.
const autorSchema = new Schema(
  {
    _id: { type: Schema.Types.ObjectId, required: true },
    nombre: { type: String, required: true },
    avatarUrl: { type: String },
  },
  { _id: false }
);

// Configuración común del Schema padre.
const baseOptions = {
  discriminatorKey: 'tipo', // Identifica el tipo de post.
  timestamps: true, // Agrega createdAt y updatedAt.
  collection: 'postculturas', // Colección compartida.
};

// Schema padre con los campos comunes de todos los posts.
const postCulturaBaseSchema = new Schema(
  {
    titulo: { type: String, required: true },
    descripcion: { type: String, required: true },
    autor: { type: autorSchema, required: true },
    imagenUrl: { type: String },
    ubicacion: { type: String },
  },
  baseOptions
);

// Modelo principal de PostCultura.
export const PostCultura = model('PostCultura', postCulturaBaseSchema);

// Post de tipo foro: hereda los campos del Schema padre.
export const ForoPost = PostCultura.discriminator(
  'foro',
  new Schema({
    categoria: { type: String, required: true },
    comentariosCount: { type: Number, default: 0 },
  })
);

// Post de tipo reunión: hereda los campos del Schema padre.
export const ReunionPost = PostCultura.discriminator(
  'reunion',
  new Schema({
    fecha: { type: String, required: true },
    hora: { type: String, required: true },
    lugar: { type: String, required: true },
    cupoMaximo: { type: Number },
    whatsappContacto: { type: String, required: true },
  })
);

// Post de tipo colaboración: hereda los campos del Schema padre.
export const ColaboracionPost = PostCultura.discriminator(
  'colaboracion',
  new Schema({
    habilidadesRequeridas: { type: [String], required: true },
    whatsappContacto: { type: String, required: true },
    vigenteHasta: { type: String },
  })
);

// Post de tipo donación: hereda los campos del Schema padre.
export const DonacionPost = PostCultura.discriminator(
  'donacion',
  new Schema({
    metaDescripcion: { type: String, required: true },
    whatsappContacto: { type: String, required: true },
    urgente: { type: Boolean, default: false },
  })
);

