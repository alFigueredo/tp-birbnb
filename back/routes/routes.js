import { registerNotificacionRoutes } from "./NotificacionRoutes.js";
import { registerReservaRoutes } from "./ReservaRoutes.js";

export function configureRoutes(app, getController) {
  registerNotificacionRoutes(app, getController);
  registerReservaRoutes(app, getController);
}
