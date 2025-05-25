import mongoose from "mongoose";

//Conexion con MONGO (hay que cambiar el MONGO_URL, luego lo veo)
export class MongoDBClient {
  static async connect() {
    try {
      const conn = await mongoose.connect(process.env.MONGO_URL);
      console.log(`Conectado a MongoDB: ${conn.connection.host}`);
    } catch (error) {
      console.error(`Error al conectar a MongoDB: ${error.message}`);
      process.exit(1);
    }
  }
}
