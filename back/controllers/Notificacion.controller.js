import { NotificacionService } from "../services/Notificacion.service.js";

export class NotificacionController {
  constructor(notificacionService = new NotificacionService()) {
    this.notificacionService = notificacionService;
  }

  async findAll(req, res, next) {
    try {
      const notificaciones = await this.notificacionService.findAll(
        req.params.type,
      );
      res.json(notificaciones);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const actualizado = await this.notificacionService.update(req.params.id);
      res.json(actualizado);
    } catch (error) {
      next(error);
    }
  }
}
