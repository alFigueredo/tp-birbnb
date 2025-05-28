import { registerNotificacionRoutes } from "./NotificacionRoutes.js";
import { registerReservaRoutes } from "./ReservaRoutes.js";
import { registerAlojamientoRoutes } from "./AlojamientoRoutes.js";

export function configureRoutes(app, getController) {
  registerNotificacionRoutes(app, getController);
  registerReservaRoutes(app, getController);
  registerAlojamientoRoutes(app, getController);
}
