import { ReservaModel } from "../schemas/ReservaSchema.js";

export class ReservaRepository {
  constructor() {
    //este model representa una coleccion de reservas
    this.model = ReservaModel;
  }

  async findAll(query = {}) {
    return this.model.find(query).populate("huespedReservador");
  }

  async findById(id) {
    return this.model.findById(id).populate("huespedReservador");
  }

  //para crear un doc en la base y para updatear (actualizar la reserva)
  async save(reserva) {
    const query = reserva.id
      ? { _id: reserva.id }
      : { _id: new this.model()._id };
    return await this.model.findByIdAndUpdate(query, reserva, {
      new: true,
      upsert: true,
    });
    // if (reserva.id) {
    //   //actualizacion
    //   const reservaActualizada = await this.model.findByIdAndUpdate(
    //     reserva.id,
    //     reserva,
    //     { new: true },
    //   );
    //   return reservaActualizada;
    // } else {
    //   const nuevaReserva = new this.model(reserva);
    //   const reservaGuardada = await nuevaReserva.save();
    //   return reservaGuardada;
    // }
  }

  async deleteById(id) {}
}
