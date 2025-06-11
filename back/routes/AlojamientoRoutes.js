import { AlojamientoController } from "../controllers/AlojamientoController.js";

export function registerAlojamientoRoutes(app, getController) {
  //buscar con filtros
  app.get("/alojamiento", (req, res, next) =>
    getController(AlojamientoController).findAll(req, res, next),
  );

  //buscar por ID
  app.get("/alojamiento/:id", (req, res, next) =>
    getController(AlojamientoController).findById(req, res, next),
  );

}

