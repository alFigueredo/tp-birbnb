import { healthRoutes } from "./healthRoutes.js";
import { swaggerRoutes } from "./swaggerRoutes.js";
import { registerNotificacionRoutes } from "./NotificacionRoutes.js";
import { registerReservaRoutes } from "./ReservaRoutes.js";
import { registerAlojamientoRoutes } from "./AlojamientoRoutes.js";

export function configureRoutes(app, getController) {
  app.use(healthRoutes());
  app.use(swaggerRoutes());
  registerNotificacionRoutes(app, getController);
  registerReservaRoutes(app, getController);
  registerAlojamientoRoutes(app, getController);
}
