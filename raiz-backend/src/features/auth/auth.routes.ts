import { Router } from "express";
import * as authController from './auth.controller';
import { requireAuth } from "./auth.middleware";
// import { requireAuth } from "./auth.middleware";

const authRouter = Router();


authRouter.post('/registro', authController.registro);
authRouter.post('/login', authController.login);
authRouter.post('/logout', authController.logout);
authRouter.get('/me', requireAuth, authController.me);
authRouter.get('/:id/perfil', authController.perfil);
authRouter.post('/:id/seguir', requireAuth, authController.seguir);
authRouter.post('/:id/dejar-de-seguir', requireAuth, authController.dejarDeSeguir);

export default authRouter;