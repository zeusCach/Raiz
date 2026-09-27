
//archivo de configuracion ts, permite evaluar el acceso de nuestras credenciales .env
import dotenv from 'dotenv';
dotenv.config();

function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Falta la variable de entorno ${key} en tu .env`);
  }
  return value;
}

//objeto env para uso en db, app, server
export const env = {
  port: process.env.PORT || 3000,
  mongoUri: requireEnv('MONGO_URI'),
  clientUrls: (process.env.CLIENT_URLS || 'http://localhost:5173,http://192.168.2.6:5173').split(','),
  jwtSecret: requireEnv('JWT_SECRET'),
};

