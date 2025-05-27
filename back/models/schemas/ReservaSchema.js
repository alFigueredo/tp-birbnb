import mongoose from "mongoose";
import { Reserva, RangoFechas } from "../entities/Reserva.js";
import { Estados, Pendiente } from "../entities/CambioEstadoReserva.js";

const reservaSchema = new mongoose.Schema({
  //crear todos sus datos
  fechaAlta: { type: Date, default: Date.now() },
  huespedReservador: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
  cantHuespedes: Number,
  alojamiento: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Alojamiento",
    required: true,
  },
  rangoFechas: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "RangoFechas",
    required: true,
  },
  precioPorNoche: { type: Number, required: true },
  estado: {
    //Enum de Estado
    type: String,
    enum: Object.keys(Estados),
    default: "PENDIENTE",
    required: true,
  },
  // estado: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   enums: [Pendiente, Confirmada, Cancelada],
  //   ref: "Estado",
  //   required: true,
  // },
});

const rangoFechasSchema = new mongoose.Schema({
  fechaInicio: { type: Date, required: true },
  fechaFin: { type: Date, required: true },
});

//vinculamos las clases de Reserva y RangoFechas con los schemas
reservaSchema.loadClass(Reserva);
rangoFechasSchema.loadClass(RangoFechas);

export const ReservaModel = mongoose.model("Reserva", reservaSchema);
export const RangoFechasModel = mongoose.model(
  "RangoFechas",
  rangoFechasSchema,
);
