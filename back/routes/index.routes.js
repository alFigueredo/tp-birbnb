import { registerNotificacionRoutes } from "./Notificacion.routes.js";

export function configureRoutes(app, getController) {
  registerNotificacionRoutes(app, getController);
}
