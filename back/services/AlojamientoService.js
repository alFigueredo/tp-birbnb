import { AlojamientoRepository } from "../models/repositories/AlojamientoRepository.js";

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
    return this.alojamientoRepository.findById(id);
  }

  async delete(id) {
    return this.alojamientoRepository.deleteById(id);
  }
}