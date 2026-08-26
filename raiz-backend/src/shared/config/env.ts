<<<<<<< HEAD
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
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
};
=======

import dotenv from 'dotenv';
dotenv.config();

export const env = {
   mongodb_username: '221k0014_db_user',
   mongodb_password: 'cczfNAg9UmKMrU1x',
   port: process.env.PORT || 3000,
   mongoUri: process.env.MONGO_URI || 'mongodb+srv://221k0014_db_user:cczfNAg9UmKMrU1x@cluster0.xfnalmx.mongodb.net/raiz?appName=Cluster0',
   clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
}
>>>>>>> origin/develop
