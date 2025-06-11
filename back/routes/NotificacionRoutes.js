import { NotificacionController } from "../controllers/NotificacionController.js";

export function registerNotificacionRoutes(app, getController) {
  app.get("/notificacion", (req, res, next) =>
    getController(NotificacionController).findAll(req, res, next),
  );

  app.get("/usuario/:idUsuario/notificacion", (req, res, next) =>
    getController(NotificacionController).findByUsuario(req, res, next),
  );

  app.get("/usuario/:idUsuario/notificacion/:type", (req, res, next) =>
    getController(NotificacionController).findByUsuario(req, res, next),
  );

  app.put("/notificacion/:id/leer", (req, res, next) =>
    getController(NotificacionController).update(req, res, next),
  );
}
