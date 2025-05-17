import { Pendiente } from "./CambioEstadoReserva.js";
import { Usuario } from "./Usuario.js";

export class Reserva {
  constructor(
    huespedReservador,
    cantHuespedes,
    alojamiento,
    rangoFechas,
    precioPorNoche,
  ) {
    this.fechaAlta = new Date();
    this.huespedReservador = huespedReservador;
    this.cantHuespedes = cantHuespedes;
    this.alojamiento = alojamiento;
    this.rangoFechas = rangoFechas;
    this.estado = new Pendiente();
    this.precioPorNoche = precioPorNoche;

    // Crea notificación
    // const notificacion = FactoryNotificacion.crearSegunReserva(this);
    // console.log(notificacion.mensaje);
  }

  actualizarEstado(nuevoEstado) {
    this.estado = nuevoEstado;
  }

  obtenerUsuario() {
    const usuarioANotificar = this.estado.obtenerUsuario(this);

    if (!(usuarioANotificar instanceof Usuario)) {
      throw new Error(
        `No hay registro del usuario para el estado: ${this.estado.estado}`,
      );
    }
    return usuarioANotificar;
  }
}

export class RangoFechas {
  constructor(fechaInicio, fechaFin) {
    this.fechaInicio = fechaInicio;
    this.fechaFin = fechaFin;

    if (this.fechaInicio > this.fechaFin)
      throw new Error(`Rango de fechas incorrecto`);
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
}
