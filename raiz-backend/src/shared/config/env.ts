
import dotenv from 'dotenv';
dotenv.config();

export const env = {
   mongodb_username: '221k0014_db_user',
   mongodb_password: 'cczfNAg9UmKMrU1x',
   port: process.env.PORT || 3000,
   mongoUri: process.env.MONGO_URI || 'mongodb+srv://221k0014_db_user:cczfNAg9UmKMrU1x@cluster0.xfnalmx.mongodb.net/raiz?appName=Cluster0',
   clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
}