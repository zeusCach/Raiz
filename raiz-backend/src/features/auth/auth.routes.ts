import { Router } from "express";
import * as authController from './auth.controller';
// import { requireAuth } from "./auth.middleware";

const authRouter = Router();


authRouter.post('/registro', authController.registro);
authRouter.post('/login', authController.login);
authRouter.post('/logout', authController.logout)
// router.get('me', requireAuth, authController.me)

export default authRouter;