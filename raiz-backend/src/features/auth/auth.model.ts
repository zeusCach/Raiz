import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    siguiendo: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }],
    bio: { type: String, default: '' },
    formacion: { type: String, default: '' },
    intereses: [{ type: String, default: [] }],
    fotoUrl: { type: String, default: '' },
    bannerUrl: { type: String, default: '' },
  },
  { timestamps: true }
);

export const User = model('User', userSchema);