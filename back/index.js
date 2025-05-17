import express from "express";
import mongoose from "mongoose";
import "dotenv/config";

export const app = express();

//Conexion con MONGO (hay que cambiar el MONGO_URL, luego lo veo)
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.error("Error al conectar a MongoDB", err));

//Endpoint de prueba
app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
  });
});

//Conexicion con el Server
const port = process.env.SERVER_PORT ?? 3000;
app.listen(port, () => {
  console.log("Server on port " + port);
});

/*
app.get
app.post
app.put
app.delete
"/api/reservas"
"/api/alojamientos?ubicacion="
"/api/notificaciones/sinleer"
"/api/notificaciones/leido"
*/

