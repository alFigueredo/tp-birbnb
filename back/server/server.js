import express from "express";
import cors from "cors"; // <-- IMPORTACIÓN
import { configureRoutes } from "../routes/routes.js";
import { errorHandler } from "../middlewares/errorHandler.js";
import { swaggerRoutes } from "../routes/swaggerRoutes.js";

export class Server {
  #controllers = {};
  #app;

  constructor(app, port = 4000) { 
    this.#app = app;
    this.port = port;

    
    this.#app.use(cors({
      origin: 'http://localhost:3000' //Frontend en Next
    }));

    this.#app.use(express.json());
    this.#app.use(express.static("public"));
  }

  get app() {
    return this.#app;
  }

  setController(controllerClass, controller = new controllerClass()) {
    this.#controllers[controllerClass.name] = controller;
  }

  getController(controllerClass) {
    const controller = this.#controllers[controllerClass.name];
    if (!controller) {
      throw new Error("Controller missing for the given route.");
    }
    return controller;
  }

  configureRoutes() {
    configureRoutes(this.#app, this.getController.bind(this));

    this.#app.get("/health", (_req, res) => {
      res.json({ status: "ok" });
    });

    this.#app.use(swaggerRoutes());

    this.#app.use((_req, res) => {
      res.status(404).json({
        status: "fail",
        message: "La ruta solicitada no existe",
      });
    });

    this.#app.use(errorHandler);
  }

  launch() {
    this.#app.listen(this.port, () => {
      console.log("Server running on port " + this.port);
    });
  }
}