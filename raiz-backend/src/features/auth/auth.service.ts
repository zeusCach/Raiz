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