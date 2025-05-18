import { NotificacionModel } from "../schemas/NotificacionSchema";

export class NotificacionRepository {
  constructor() {
    this.model = NotificacionModel;
  }

  async findAll({ leida }) {
    return (notificaciones = await this.model.findAll({ leida }));
  }

  async findById(id) {
    return (notificacion = await this.model.findById(id));
  }

  async save(notificacion) {
    return await this.model.findByIdAndUpdate(
      { _id: notificacion.id },
      notificacion
    );
  }
}
