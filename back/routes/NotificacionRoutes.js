import { NotificacionController } from "../controllers/NotificacionController.js";

export function registerNotificacionRoutes(app, getController) {
  app.get("/notificacion/{:type}", (req, res, next) =>
    getController(NotificacionController).findAll(req, res, next),
  );

  app.put("/notificacion/leida/{:id}", (req, res, next) =>
    getController(NotificacionController).update(req, res, next),
  );
}
