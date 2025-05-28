import { NotificacionModel } from "../schemas/NotificacionSchema.js";

export class NotificacionRepository {
  constructor() {
    this.model = NotificacionModel;
  }

  async findAll(query) {
    return await this.model.find(query).populate("usuario");
  }

  async findById(id) {
    return await this.model.findById(id).populate("usuario");
  }

  async save(notificacion) {
    return await this.model
      .findByIdAndUpdate({ _id: notificacion.id }, notificacion, { new: true })
      .populate("usuario");
  }
}
