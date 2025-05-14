import mongoose from "mongoose";
import { Usuario } from "../Usuario";

const usuarioSchema= new mongoose.Schema({
        //crear todos sus datos
})

usuarioSchema.loadClass(Usuario);
const UsuarioModel = mongoose.model('Usuario',usuarioSchema)  //para poder usar usuario en otros schemas