import mongoose from "mongoose";
import { Reserva, RangoFechas } from "../entities/Reserva.js";
import { Estados } from "../entities/CambioEstadoReserva.js";

const rangoFechasSchema = new mongoose.Schema({
  fechaInicio: { type: Date, required: true },
  fechaFin: { type: Date, required: true },
});

//vinculamos la clase de RangoFechas con los schemas
rangoFechasSchema.loadClass(RangoFechas);

const reservaSchema = new mongoose.Schema({
 
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
    type: rangoFechasSchema,
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
  
});

//vinculamos la clase de Reserva con los schemas
reservaSchema.loadClass(Reserva);

export const ReservaModel = mongoose.model("Reserva", reservaSchema);
