import { Server } from "./back/server/server";
import "dotenv/config";
import { MongoDBClient } from "./back/config/database.js";
import express from "express";

const app = express();
const port = process.env.PORT || 3000;
const server = new Server(app, port);

MongoDBClient.connect();

server.configureRoutes();
server.launch();
