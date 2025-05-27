import mongoose from "mongoose";
import { Direccion, Ciudad, Pais } from "../entities/Direccion.js";

const direccionSchema = new mongoose.Schema({
  calle: { type: String, required: true },
  altura: { type: String, required: true },
  ciudad: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ciudad",
    required: true,
  },
  lat: { type: String, required: true },
  long: { type: String, required: true },
});

const ciudadSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  pais: { type: mongoose.Schema.Types.ObjectId, ref: "Pais", required: true },
});

const paisSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
});

direccionSchema.loadClass(Direccion);
ciudadSchema.loadClass(Ciudad);
paisSchema.loadClass(Pais);

export const DireccionModel = mongoose.model("Direccion", direccionSchema);
export const CiudadModel = mongoose.model("Ciudad", ciudadSchema);
export const PaisModel = mongoose.model("Pais", paisSchema);
