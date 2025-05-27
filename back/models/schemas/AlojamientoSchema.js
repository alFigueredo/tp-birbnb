// Define estructura para Mongo (con Mongoose)
import mongoose from "mongoose";
import {
  Alojamiento,
  Moneda,
  Caracteristica,
  Foto,
} from "../entities/Alojamiento.js";
import { direccionSchema } from "./DireccionSchema.js";

const alojamientoSchema = new mongoose.Schema({
  anfitrion: {
    //Esta relacionado al objecto de Usuario
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
  nombre: { type: String, required: true },
  descripcion: String,
  precioPorNoche: { type: Number, required: true },
  moneda: {
    //Enum de Moneda
    type: String,
    enum: Object.values(Moneda),
    default: Moneda.PESO_ARG,
    required: true,
  },
  horarioCheckIn: String,
  horarioCheckOut: String,
  direccion: {
    //Lo relaciono con la direccion
    type: direccionSchema,
    required: true,
  },
  cantHuespedesMax: Number,
  caracteristicas: [
    {
      type: String,
      enum: Object.values(Caracteristica),
      required: true,
    },
  ], //Lista de Enun de Caracteristicas
  reservas: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reserva" }], //un alojamiento puede NO tener una reserva
  fotos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Foto" }],
});

const fotoSchema = new mongoose.Schema({
  descripcion: String,
  path: String,
});

//Vinculamos las clases con sus respectivos Schemas
alojamientoSchema.loadClass(Alojamiento);
fotoSchema.loadClass(Foto);

//Exportar el modelo
export const AlojamientoModel = mongoose.model(
  "Alojamiento",
  alojamientoSchema,
);

export const FotoModel = mongoose.model("Foto", fotoSchema);
