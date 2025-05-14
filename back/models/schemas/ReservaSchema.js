import mongoose from "mongoose";
import { Reserva } from "../Reserva";

const reservaSchema= new mongoose.Schema({
    //crear todos sus datos
})

reservaSchema.loadClass(Reserva);
const ReservaModel = mongoose.model('Reserva',reservaSchema)