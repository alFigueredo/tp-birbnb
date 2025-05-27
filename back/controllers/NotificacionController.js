import { NotificacionService } from "../services/NotificacionService.js";

export class NotificacionController {
  constructor(notificacionService = new NotificacionService()) {
    this.notificacionService = notificacionService;
  }

  async findAll(req, res, next) {
    try {
      const notificaciones = await this.notificacionService.findAll(
        req.params.type,
      );
      res.status(200).json(notificaciones);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const actualizado = await this.notificacionService.update(req.params.id);
      res.status(200).json(actualizado);
    } catch (error) {
      next(error);
    }
  }
}
