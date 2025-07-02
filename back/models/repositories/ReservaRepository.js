import { ReservaModel } from "../schemas/ReservaSchema.js";

export class ReservaRepository {
  constructor() {
    //este model representa una coleccion de reservas
    this.model = ReservaModel;
  }

  async findAll(query = {}) {
    return this.model
      .find(query)
      .populate("huespedReservador")
      .populate("alojamiento");
  }

  async findById(id) {
    return this.model
      .findById(id)
      .populate("huespedReservador")
      .populate("alojamiento");
  }

  // se guarda la reserva primero verificando que exista
  async save(reserva) {
    const query = reserva.id
      ? { _id: reserva.id }
      : { _id: new this.model()._id };
    return await this.model.findByIdAndUpdate(query, reserva, {
      new: true,
      upsert: true,
    });
  }
}
