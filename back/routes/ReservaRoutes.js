import { ReservaController } from "../controllers/ReservaController.js";

export function registerReservaRoutes(app, getController) {
  app.get("/reserva", (req, res, next) =>
    getController(ReservaController).findAll(req, res, next),
  );

  app.post("/reserva", (req, res, next) =>
    getController(ReservaController).create(req, res, next),
  );

  app.put("/reserva/:idReserva/cancelar", (req, res, next) =>
    getController(ReservaController).cancelacionReserva(req, res, next),
  );

  app.get("/usuario/:idUsuario/reserva", (req, res, next) =>
    getController(ReservaController).historialReservas(req, res, next),
  ); //antes:reserva/:idUsuario

  app.put("/reserva/:idReserva", (req, res, next) =>
    getController(ReservaController).modificacionReserva(req, res, next),
  );

  app.put("/reserva/:idReserva/confirmar", (req, res, next) =>
    getController(ReservaController).confirmarReserva(req, res, next),
  );

  app.put("/reserva/:idReserva/rechazar", (req, res, next) =>
    getController(ReservaController).rechazarReserva(req, res, next),
  );
}
