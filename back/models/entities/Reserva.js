import { ValidationError } from "../../errors/appError.js";
import { Estados } from "./CambioEstadoReserva.js";

export class Reserva {
  constructor(
    huespedReservador,
    cantHuespedes,
    alojamiento,
    rangoFechas,
    precioPorNoche,
  ) {
    this.fechaAlta = Date.now();
    this.huespedReservador = huespedReservador;
    this.cantHuespedes = cantHuespedes;
    this.alojamiento = alojamiento;
    this.rangoFechas = rangoFechas;
    this.estado = "PENDIENTE";
    this.precioPorNoche = precioPorNoche;
  }

  actualizarEstado(nuevoEstado) {
    if (!Object.keys(Estados).includes(nuevoEstado))
      throw new ValidationError(
        `El estado especificado no existe: ${nuevoEstado}`,
      );
    if (nuevoEstado === "PENDIENTE") this.fechaAlta = Date.now();
    this.estado = nuevoEstado;
  }

  obtenerUsuario() {
    const usuarioANotificar = Estados[this.estado]().obtenerUsuario(this);

    if (!usuarioANotificar) {
      throw new ValidationError(
        `No hay registro del usuario para el estado: ${this.estado}`,
      );
    }
    return usuarioANotificar;
  }

  modificarCantidadHuespedes(cantHuespedes) {
    this.cantHuespedes = cantHuespedes;
  }

  modificarFechas(rangoFechas) {
    this.rangoFechas.modificarFechas(rangoFechas);
  }
}

export class RangoFechas {
  constructor(fechaInicio, fechaFin) {
    this.fechaInicio = fechaInicio;
    this.fechaFin = fechaFin;

    if (this.fechaInicio > this.fechaFin)
      throw new ValidationError(`Rango de fechas incorrecto`);
  }

  entreFechas(rangoFechas) {
    return (
      this.fechaInicio < rangoFechas.fechaFin &&
      this.fechaFin > rangoFechas.fechaInicio
    );
  }

  cantidadDias() {
    return Math.floor(
      (this.fechaFin - this.fechaInicio) / (1000 * 60 * 60 * 24),
    );
  }

  modificarFechas(rangoFechas) {
    this.fechaInicio = rangoFechas.fechaInicio;
    this.fechaFin = rangoFechas.fechaFin;
  }

  equals(rangoFechas) {
    return (
      this.fechaInicio.getTime() === rangoFechas.fechaInicio.getTime() &&
      this.fechaFin.getTime() === rangoFechas.fechaFin.getTime()
    );
  }
}
