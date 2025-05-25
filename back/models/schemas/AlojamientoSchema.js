// Define estructura para Mongo (con Mongoose)
import mongoose from "mongoose";
import {
  Alojamiento,
  Moneda,
  Caracteristica,
  Foto,
} from "../entities/Alojamiento";

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
  caracteristicas: [
    new Schema({
      type: String,
      enum: Object.values(Caracteristica),
      required: true,
    }),
  ], //Lista de Enun de Caracteristicas
  reservas: [
    new Schema({ type: mongoose.Schema.Types.ObjectId, ref: "Reserva" }),
  ], //un alojamiento puede NO tener una reserva
  fotos: [fotoSchema],
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
  alojamientoSchema
);

export const FotoModel = mongoose.model("Foto", fotoSchema);
