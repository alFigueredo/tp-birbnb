import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import { errorHandler } from "./middlewares/errorHandler.js";
import { MongoDBClient } from "./config/database";
import { NotificacionRepository } from "./models/repositories/NotificacionRepository.js";
import { NotificacionService } from "./services/NotificacionService.js";
import { NotificacionController } from "./controllers/NotificacionController";
import { registerNotificacionRoutes } from "./routes/NotificacionRoutes";

export const app = express();

app.use(express.json());
app.use(errorHandler);

MongoDBClient.connect();

//Endpoint de prueba
app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
  });
});

const notificationRepository = new NotificacionRepository();
const notificacionService = new NotificacionService(notificationRepository);
const notificacionController = new NotificacionController(notificacionService);
registerNotificacionRoutes(app, notificacionController);

//Conexion con el Server
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
