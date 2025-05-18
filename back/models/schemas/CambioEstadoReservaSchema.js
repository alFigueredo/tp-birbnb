import mongoose from "mongoose";
import { CambioEstadoReserva, Estados } from "../entities/CambioEstadoReserva";

/* const estadoSchema = new mongoose.Schema({
  estado: {
    type: String,
    enum: ["PENDIENTE", "CONFIRMADA", "CANCELADA"],
    default: "PENDIENTE",
    required: true,
  },
}); */

const cambioEstadoReservaSchema = new mongoose.Schema({
  fecha: { type: Date, default: Date.now() },
  estado: {
    //Enum de Estado
    type: String,
    enum: Object.keys(Estados),
    required: true,
  },
  reserva: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Reserva",
    required: true,
  },
  motivo: String,
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
});

// estadoSchema.loadClass(Estado);
cambioEstadoReservaSchema.loadClass(CambioEstadoReserva);

// export const estadoModel = mongoose.model("Estado", estadoSchema);
export const cambioEstadoReservaModel = mongoose.model(
  "CambioEstadoReserva",
  cambioEstadoReservaSchema
);
