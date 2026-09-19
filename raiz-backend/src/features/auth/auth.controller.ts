import { Request, Response, NextFunction } from "express";
import * as authService from "./auth.service";

const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: false, //en produccion cambiar a true
    sameSite: 'lax' as const,
    maxAge: 7 * 24 * 60 * 60 * 1000
}

export async function registro(req: Request, res: Response, next: NextFunction) {

    try {
        // Capturamos los valores enviados por el cliente pra registro
        const {nombreCompleto, email, password} = req.body;
        const {user, token} = await authService.registrarUsuario(nombreCompleto, email, password);

        //permite que el navegador conserve las credenciales de autenticacion
        res.cookie('token', token, COOKIE_OPTIONS);
        res.status(201).json({user: {_id: user._id, nombre: user.nombre, email: user.email}});

    } catch (error) {
        if(error instanceof Error && error.message.includes("Ya existe")){
            res.status(409).json({message: error.message});

            return;
        }

        next(error);
    }
    
}


export async function login(req: Request, res: Response, next: NextFunction) {

    try {

        //tomamos los valores enviados del navegador en respuesta
        const {email, password} = req.body;

        const {user, token} = await authService.loginUsuario(email, password);

        //permite que el navegador conserve las credenciales de autenticacion
        res.cookie('token', token, COOKIE_OPTIONS);
        res.json({user: {_id: user._id, nombre: user.nombre, email: user.email}})
        
    } catch (error) {
        //se instacia un error existiendo
        if (error instanceof Error && error.message.includes('incorrectos')) {
            res.status(401).json({ message: error.message });
            return;
        }
        //se detiene cualquier ruta en caso de error (no procede acciones)
        next(error);
    }
}

//logout permite cerrar sesion limpiando las cookies del navegador
export function logout(_req: Request, res: Response){
    res.clearCookie('token', COOKIE_OPTIONS);
    res.status(204).send();
}


export function me(req: Request, res: Response) {
  res.json({ user: req.user });
}