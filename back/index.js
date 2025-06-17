import "dotenv/config";
import { Server } from "./server/server.js";
import { MongoDBClient } from "./config/database.js";
import express from "express";
import { AlojamientoController } from "./controllers/AlojamientoController.js";
import { NotificacionController } from "./controllers/NotificacionController.js";
import { ReservaController } from "./controllers/ReservaController.js";
import { exec } from "./exec.js";

const app = express();
const port = process.env.SERVER_PORT || 3000;
const server = new Server(app, port);

MongoDBClient.connect();
// Llena la base de datos con algunos documentos para probar
setTimeout(() => exec(), 1000);

server.setController(NotificacionController);
server.setController(ReservaController);
server.setController(AlojamientoController);
server.configureRoutes();
server.launch();
