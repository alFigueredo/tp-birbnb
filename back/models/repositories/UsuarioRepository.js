import { UsuarioModel } from "../schemas/UsuarioSchema.js";

export class UsuarioRepository {
  constructor() {
    //este model representa una coleccion de reservas
    this.model = UsuarioModel;
  }

  async findAll(query = {}) {
    return this.model.find(query);
  }

  async findById(id) {
    return this.model.findById(id);
  }
}
