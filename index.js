import "dotenv/config";
import { Server } from "./back/server/server.js";
import { MongoDBClient } from "./back/config/database.js";
import express from "express";
import { AlojamientoController } from "./back/controllers/AlojamientoController.js";
import { NotificacionController } from "./back/controllers/NotificacionController.js";
// import { exec } from "./exec.js";

const app = express();
const port = process.env.PORT || 3000;
const server = new Server(app, port);

MongoDBClient.connect();
// Llena la base de datos con algunos documentos para probar
// setTimeout(() => exec(), 3000);

server.setController(NotificacionController);
server.setController(AlojamientoController);
server.configureRoutes();
server.launch();
