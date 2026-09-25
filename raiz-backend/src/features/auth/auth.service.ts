import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "./auth.model";
import { env } from "../../shared/config/env";

// Define el "nivel de seguridad" para encriptar la contraseña (estándar recomendado).
const SALT_ROUNDS = 10;
const TOKEN_EXPIRY = '1d'; //Define el tiempo de expiracion


//Logica de negocio con jwt para registar un usuario
export async function registrarUsuario(nombre: string, email: string, password: string) {

    //buscamos email de usuario intentando loguearse
    const existente = await User.findOne({email});

    //si existe se rechaza el registro (intentar recuperar )
    if(existente) {
        throw new Error(" Ya existe una cuenta con ese correo :(")
    }
    
    //hasheamos la contrseña con nivel de seguridad con bcrypt
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    //creamos el usuario y asignamos a password el valor de la contraseña hasheada
    const user = await User.create({nombre, email, password: passwordHash});


    //generamos token 
    const token = generarToken(user._id.toString());
    return {user, token};

}

//logica de negocio para logear un usuario
export async function loginUsuario(email: string, password: string) {
    //buscamos email de usuario intentando loguearse
    const user = await User.findOne({email});

    //si es diferente ne se podra loguear
    if(!user) {
        throw new Error("Correo o contraseña incorrectos");
    }

    //validamos/comparamos la contraseña asignada por usuario
    const passwordValida = await bcrypt.compare(password, user.password)

    //si es diferente se invalida su acceso
    if(!passwordValida) {
        throw new Error('Correo o contraseña incorrectos');
    }

    //genera token de acceso si pasa el filtro
    const token = generarToken(user._id.toString());
    return {user, token}
}


//fuente de verdad, se comprueban accesos segun la logica y asigna valor de tiempo de expiracion
function generarToken(userId: string) {
    return jwt.sign({sub: userId}, env.jwtSecret, {expiresIn: TOKEN_EXPIRY});
}


export async function seguirUsuario(userId: string, targetId: string) {
  //verificamos que el usuario no intente seguirse a sí mismo
  if (userId === targetId) {
    throw new Error('No puedes seguirte a ti mismo');
  }

  //buscamos al usuario que se quiere seguir
  const target = await User.findById(targetId);

  //si no existe el usuario se rechaza la acción
  if (!target) {
    throw new Error('Usuario no encontrado');
  }

  //agregamos al usuario a la lista de seguidos evitando duplicados
  await User.findByIdAndUpdate(userId, { $addToSet: { siguiendo: targetId } });

  //buscamos nuevamente al usuario para obtener la lista actualizada
  const actualizado = await User.findById(userId);

  //devolvemos los ids de los usuarios que sigue
  return actualizado!.siguiendo.map((id) => id.toString());
}

export async function dejarDeSeguirUsuario(userId: string, targetId: string) {
  //eliminamos al usuario de la lista de seguidos
  await User.findByIdAndUpdate(userId, { $pull: { siguiendo: targetId } });

  //buscamos nuevamente al usuario para obtener la lista actualizada
  const actualizado = await User.findById(userId);

  //devolvemos los ids de los usuarios que sigue
  return actualizado!.siguiendo.map((id) => id.toString());
}

export async function obtenerPerfilPublico(id: string) {
  //buscamos al usuario y obtenemos solamente sus datos públicos
  const user = await User.findById(id).select('nombre createdAt');

  //si no existe el usuario se rechaza la consulta
  if (!user) {
    throw new Error('Usuario no encontrado');
  }

  //devolvemos los datos públicos del usuario
  return user;
}