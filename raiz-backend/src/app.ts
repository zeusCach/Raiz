//api principal que se encargara de nuestro negocio para Raiz, actualmente solo comprueba el resultado de conneccion al servidor y devuelta del servidor al cliente
import express from 'express';
import cors from 'cors';
import { env } from './shared/config/env';

const app = express();

app.use(cors({origin: env.clientUrl}));
app.use(express.json());

app.get('/api/health', (_req, res) => {
    res.json({status: 'ok'});
});


export default app;