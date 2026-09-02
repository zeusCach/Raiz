//connection async a nuestra db pormedio de mongoose
import mongoose from "mongoose";
import { env } from "./env";

export async function connectDB() {

    try {
        await mongoose.connect(env.mongoUri);
        console.log('Conexion exitosa');
        
    } catch (error) {
        console.log(error, 'Error al conectarse con la base de datos');
        process.exit(1);
    }
}