import { registerNotificacionRoutes } from "./NotificacionRoutes.js";

export function configureRoutes(app, getController) {
  registerNotificacionRoutes(app, getController);
}
