import { ReservaService } from "../services/ReservaService.js";

export class ReservaController {
  constructor(reservaService = new ReservaService()) {
    this.reservaService = reservaService;
  }

  async findAll(req, res, next) {
    try {
      const reserva = await this.reservaService.findAll();
      res.json(reserva);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const reserva = await this.reservaService.create(req.params.id);
      res.json(reserva);
    } catch (error) {
      next(error);
    }
  }

  async historialReservas(req, res, next) {
    try {
      const listaReservas = await this.reservaService.historialReservas(req.params.idUsuario);
      res.json(listaReservas);
    } catch (error) {
      next(error);
    }
  }
}
