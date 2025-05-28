import { AlojamientoRepository } from "../models/repositories/AlojamientoRepository.js";
import { NotFoundError } from "../errors/appError.js";

export class AlojamientoService {
  constructor(alojamientoRepository = new AlojamientoRepository()) {
    this.alojamientoRepository = alojamientoRepository;
  }

  async findAll(filters) {
    return this.alojamientoRepository.findAll(filters);
  }

  async findByPage(page, limit) {
    return this.alojamientoRepository.findByPage(page, limit);
  }

  async findById(id) {
    const alojamiento = await this.alojamientoRepository.findById(id);
    if (!alojamiento) throw new NotFoundError("Alojamiento no encontrado");
    return alojamiento;
  }
}
