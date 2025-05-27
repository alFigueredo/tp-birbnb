// Define estructura para Mongo (con Mongoose)
import mongoose from "mongoose";

import {Alojamiento,Moneda,Caracteristica,Foto} from "../entities/Alojamiento.js";

const Schema = mongoose.Schema;                   // para el new schema de caracteristicas y el de reserva

const fotoSchema = new mongoose.Schema({
  descripcion: String,
  path: String,
});

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
    type: mongoose.Schema.Types.ObjectId,
    ref: "Direccion",
    required: true,
  },
  cantHuespedesMax: Number,
  caracteristicas: [{
      type: String,
      enum: Object.values(Caracteristica),
      required: true,
    }], //Lista de Enun de Caracteristicas
  reservas: [{
  type: mongoose.Schema.Types.ObjectId,
  ref: "Reserva" }],             //un alojamiento puede NO tener una reserva

  fotos: [fotoSchema],
});

//Vinculamos las clases con sus respectivos Schemas
alojamientoSchema.loadClass(Alojamiento);
fotoSchema.loadClass(Foto);

//Exportar el modelo
export const AlojamientoModel = mongoose.model(
  "Alojamiento",
  alojamientoSchema
);

export const FotoModel = mongoose.model("Foto", fotoSchema);
