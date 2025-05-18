import mongoose from "mongoose";
import { TipoUsuario, Usuario } from "../entities/Usuario";

const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true },
  tipo: { type: String, enum: Object.values(TipoUsuario), required: true },
});

usuarioSchema.loadClass(Usuario);
export const UsuarioModel = mongoose.model("Usuario", usuarioSchema); //para poder usar usuario en otros schemas
