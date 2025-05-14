// Define estructura para Mongo (con Mongoose)
import mongoose from "mongoose";
import { Alojamiento } from "../Alojamiento";

const alojamientoSchema= new mongoose.Schema({
    anfitrion: {type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true},      //Esta relacionado al objecto de Usuario
    nombre: {type:String, required: true },
    descripcion: String,
    precioPorNoche: {type:Number,required:true}, //calculo que tiene que ser required(?)
    moneda:{type: String,enum: ["DOLAR_USA", "PESO_ARG", "REALES"],required: true},    //en la diapo no dice nada de los enums, pero lo busque y es asi
    horarioCheckIn: String,
    horarioCheckOut: String,
    direccion: {type: mongoose.Schema.Types.ObjectId, ref: 'Direccion', required: true}, //Lo relaciono con la direccion
    cantHuespedesMax: Number,
    caracteristicas: [String],
    reservas: [{type: mongoose.Schema.Types.ObjectId, ref: 'Reserva'}], //ListaDeReserva
    fotos: [fotoSchema]
})

const fotoSchema = new mongoose.Schema({
  descripcion: String,
  path: String,
});

alojamientoSchema.loadClass(Alojamiento);
const AlojamientoModel = mongoose.model('Alojamiento', alojamientoSchema)

