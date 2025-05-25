import { Server } from "./back/server/server.js";
import "dotenv/config";
import { MongoDBClient } from "./back/config/database.js";
import express from "express";
import { NotificacionController } from "./back/controllers/Notificacion.controller.js";

const app = express();
const port = process.env.PORT || 3000;
const server = new Server(app, port);

MongoDBClient.connect();

server.setController(NotificacionController);

server.configureRoutes();
server.launch();
