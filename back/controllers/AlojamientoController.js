import { AlojamientoService } from "../services/AlojamientoService.js";

export class AlojamientoController {
  constructor(alojamientoService = new AlojamientoService()) {
    this.alojamientoService = alojamientoService;
  }

  async findAll(req, res, next) {
    try {
      const filtros = req.query; // Tomamos los filtros desde query
      const alojamientos = await this.alojamientoService.findAll(filtros);
      res.json(alojamientos);
    } catch (error) {
      next(error);
    }
  }

  async findByPage(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const resultado = await this.alojamientoService.findByPage(page, limit);
      res.json(resultado);
    } catch (error) {
      next(error);
    }
  }

  async findById(req, res, next) {
    try {
      const alojamiento = await this.alojamientoService.findById(req.params.id);
      res.json(alojamiento);
    } catch (error) {
      next(error);
    }
  }
}
