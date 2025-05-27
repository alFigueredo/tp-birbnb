import { AlojamientoRepository } from "../models/repositories/AlojamientoRepository.js";

export class AlojamientoService {
  constructor(alojamientoRepository = new AlojamientoRepository()) {
    this.alojamientoRepository = alojamientoRepository;
  }

  async findAll(filters) {
    return this.alojamientoRepository.findAll(filters);
  }

  async findById(id) {
    return this.alojamientoRepository.findById(id);
  }

  async delete(id) {
    return this.alojamientoRepository.deleteById(id);
  }
}