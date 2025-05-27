import { AlojamientoController } from "../controllers/AlojamientoController.js";

export function registerAlojamientoRoutes(app, getController) {
  //buscar con filtros
  app.get("/alojamientos", (req, res, next) =>
    getController(AlojamientoController).findAll(req, res, next)
  );

  //buscar por ID
  app.get("/alojamientos/:id", (req, res, next) =>
    getController(AlojamientoController).findById(req, res, next)
  );

  //eliminar por ID
  app.delete("/alojamientos/:id", (req, res, next) =>
    getController(AlojamientoController).delete(req, res, next)
  );
}