import { FactoryNotificacion } from "../entities/Notificacion.js";
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

  async create(reserva, motivo = "") {
    const notificacion = FactoryNotificacion.crearSegunReserva(reserva, motivo);
    const nuevaNotificacion = new this.model(notificacion);
    await nuevaNotificacion.save(nuevaNotificacion);
  }

  // async save(notificacion) {
  //   const query = notificacion.id
  //     ? { _id: notificacion.id }
  //     : { _id: new this.model()._id };
  //   return await this.model.findByIdAndUpdate(query, notificacion, {
  //     new: true,
  //     upsert: true,
  //   });
  // }
}
