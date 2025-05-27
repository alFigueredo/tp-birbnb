import { registerNotificacionRoutes } from "./NotificacionRoutes.js";
import { registerAlojamientoRoutes } from "./AlojamientoRoutes.js";

export function configureRoutes(app, getController) {
  registerNotificacionRoutes(app, getController);
  registerAlojamientoRoutes(app, getController);
}

