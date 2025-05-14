import mongoose from "mongoose";
import { Direccion } from "../Direccion";

const direccionSchema= new mongoose.Schema({
    //crear todos sus datos
})

direccionSchema.loadClass(Direccion);
const DireccionModel = mongoose.model('Direccion',direccionSchema)