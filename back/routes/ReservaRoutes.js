import { ReservaController } from "../controllers/ReservaController.js";

export function registerReservaRoutes(app, getController) {
  app.get("/reserva", (req, res, next) =>
    getController(ReservaController).findAll(req, res, next),
  );

  app.post("/reserva", (req, res, next) =>
    getController(ReservaController).create(req, res, next),
  );

  app.get("/reserva/{:idUsuario}", (req, res, next) =>
    getController(ReservaController).historialReservas(req, res, next),
  );
}
