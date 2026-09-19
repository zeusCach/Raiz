import { Schema, model } from "mongoose";

//Creamos un schema para estructurar propiedad para iniciar sesion
const userSchema = new Schema(
  {
    nombre: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);


export const User = model('User', userSchema);