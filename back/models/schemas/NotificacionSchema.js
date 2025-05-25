import mongoose from "mongoose";
import { Notificacion } from "../entities/Notificacion.js";

const notificacionSchema = new mongoose.Schema({
  mensaje: String,
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
  fechaAlta: { type: Date, default: Date.now() },
  leida: { type: Boolean, default: false },
  fechaLeida: Date,
});

notificacionSchema.loadClass(Notificacion);
export const NotificacionModel = mongoose.model(
  "Notificacion",
  notificacionSchema,
);
