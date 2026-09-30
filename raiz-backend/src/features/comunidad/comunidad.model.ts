import { Schema, model } from 'mongoose';

const comunidadSchema = new Schema(
  {
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    creador: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    miembros: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);

export const Comunidad = model('Comunidad', comunidadSchema);