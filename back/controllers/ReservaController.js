import { ReservaService } from "../services/ReservaService.js";

export class ReservaController {
  constructor(reservaService = new ReservaService()) {
    this.reservaService = reservaService;
  }

  async findAll(_req, res, next) {
    try {
      const reserva = await this.reservaService.findAll();
      res.status(200).json(reserva);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const reserva = await this.reservaService.create(req.body);
      res.status(201).json(reserva);
    } catch (error) {
      next(error);
    }
  }

  async cancelacionReserva(req, res, next) {
    try {
      const reserva = await this.reservaService.cancelacionReserva(
        req.params.idReserva,
        req.body,
      );
      res.status(200).json(reserva);
    } catch (error) {
      next(error);
    }
  }

  async historialReservas(req, res, next) {
    try {
      const listaReservas = await this.reservaService.historialReservas(
        req.params.idUsuario,
      );
      res.status(200).json(listaReservas);
    } catch (error) {
      next(error);
    }
  }
  async modificacionReserva(req, res, next) {
    try {
      const reserva = await this.reservaService.modificacionReserva(
        req.params.idReserva,
        req.body,
      );
      res.status(200).json(reserva);
    } catch (error) {
      next(error);
    }
  }

  async confirmarReserva(req, res, next) {
    try {
      const reserva = await this.reservaService.confirmacionReserva(
        req.params.idReserva,
      );
      res.status(200).json(reserva);
    } catch (error) {
      next(error);
    }
  }

  async rechazarReserva(req, res, next) {
    try {
      const reserva = await this.reservaService.rechazoReserva(
        req.params.idReserva,
        req.body,
      );
      res.status(200).json(reserva);
    } catch (error) {
      next(error);
    }
  }
}
