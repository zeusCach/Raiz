import type { Request, Response, NextFunction } from 'express';

import * as authService from './auth.service';

//configuramos las opciones de la cookie donde se guardará el token
const COOKIE_OPTIONS = {

  httpOnly: true,

  secure: false,

  sameSite: 'lax' as const,

  maxAge: 7 * 24 * 60 * 60 * 1000,

};

export async function registro(req: Request, res: Response, next: NextFunction) {

  try {

    //obtenemos los datos enviados por el usuario
    const { nombreCompleto, email, password } = req.body;

    //registramos al usuario y obtenemos sus datos junto con el token
    const { user, token } = await authService.registrarUsuario(nombreCompleto, email, password);

    //guardamos el token en una cookie
    res.cookie('token', token, COOKIE_OPTIONS);

    //enviamos los datos del usuario registrado
    res.status(201).json({

      user: {

        _id: user._id,

        nombre: user.nombre,

        email: user.email,

        siguiendo: user.siguiendo.map((id) => id.toString()),

      },

    });

  } catch (error) {

    //si el correo ya está registrado se devuelve un error 409
    if (error instanceof Error && error.message.includes('Ya existe')) {

      res.status(409).json({ message: error.message });

      return;

    }

    //enviamos cualquier otro error al manejador de errores
    next(error);

  }

}

export async function login(req: Request, res: Response, next: NextFunction) {

  try {

    //obtenemos el correo y contraseña enviados por el usuario
    const { email, password } = req.body;

    //verificamos los datos del usuario y obtenemos sus datos junto con el token
    const { user, token } = await authService.loginUsuario(email, password);

    //guardamos el token en una cookie
    res.cookie('token', token, COOKIE_OPTIONS);

    //enviamos los datos del usuario que inició sesión
    res.json({

      user: {

        _id: user._id,

        nombre: user.nombre,

        email: user.email,

        siguiendo: user.siguiendo.map((id) => id.toString()),

      },

    });

  } catch (error) {

    //si las credenciales son incorrectas se devuelve un error 401
    if (error instanceof Error && error.message.includes('incorrectos')) {

      res.status(401).json({ message: error.message });

      return;

    }

    //enviamos cualquier otro error al manejador de errores
    next(error);

  }

}

export function logout(_req: Request, res: Response) {

  //eliminamos la cookie que contiene el token
  res.clearCookie('token', COOKIE_OPTIONS);

  //confirmamos que la sesión se cerró correctamente
  res.status(204).send();

}

export function me(req: Request, res: Response) {

  //devolvemos los datos del usuario que tiene la sesión activa
  res.json({ user: req.user });

}

export async function seguir(req: Request, res: Response, next: NextFunction) {

  try {

    //seguimos al usuario indicado y obtenemos la lista actualizada
    const siguiendo = await authService.seguirUsuario(req.user!._id, String(req.params.id));

    //enviamos la lista de usuarios que sigue
    res.json({ siguiendo });

  } catch (error) {

    //si ocurre un error en la acción se devuelve un error 400
    if (error instanceof Error) {

      res.status(400).json({ message: error.message });

      return;

    }

    //enviamos cualquier otro error al manejador de errores
    next(error);

  }

}

export async function dejarDeSeguir(req: Request, res: Response, next: NextFunction) {

  try {

    //dejamos de seguir al usuario indicado y obtenemos la lista actualizada
    const siguiendo = await authService.dejarDeSeguirUsuario(req.user!._id, String(req.params.id));

    //enviamos la lista de usuarios que sigue
    res.json({ siguiendo });

  } catch (error) {

    //enviamos el error al manejador de errores
    next(error);

  }

}

export async function perfil(req: Request, res: Response, next: NextFunction) {

  try {

    //buscamos el perfil público del usuario indicado
    const usuario = await authService.obtenerPerfilPublico(String(req.params.id));

    //enviamos la información del usuario
    res.json({ usuario });

  } catch (error) {

    //si el usuario no existe se devuelve un error 404
    if (error instanceof Error && error.message.includes('no encontrado')) {

      res.status(404).json({ message: error.message });

      return;

    }

    //enviamos cualquier otro error al manejador de errores
    next(error);

  }

}