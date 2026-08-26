import app from './app';
import { env } from './shared/config/env';
import { connectDB } from './shared/config/db';

//funcion async que espera la conexion de nuestro db y ejecuta el puerto
async function startServer() {
    await connectDB();
    app.listen(env.port, () => {
        console.log(`Servidor corriendo en http://localhost:${env.port}`);
    })
}

startServer();