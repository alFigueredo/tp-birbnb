import { EstadoReserva } from "../enumeraciones.js";

export class Notificacion {
  constructor(mensaje, usuario) {
    this.mensaje = mensaje;
    this.usuario = usuario; // Usuario
    this.fechaAlta = new Date();
    this.leida = false;
    this.fechaLeida = null;
  }

  marcarComoLeida() {
    this.leida = true;
    this.fechaLeida = new Date();
  }

  agregarMotivo(motivo) {
    this.mensaje += "\nMotivo: " + motivo;
  }
}

export class FactoryNotificacion {
  static crearSegunReserva(reserva) {
    let usuario;
    // Usar comillas graves
    let mensaje =
      "Huésped: " +
      reserva.huespedReservador.nombre +
      "\nFecha: " +
      reserva.rangoFechas.fechaInicio.toLocaleDateString() +
      "\nCantidad de días: " +
      reserva.rangoFechas.cantidadDias() +
      "\nAlojamiento: " +
      reserva.alojamiento.nombre +
      "\nEstado de la reserva: " +
      reserva.estado;
    // Eliminar switch y convertir estados en objetos
    switch (reserva.estado) {
      case EstadoReserva.PENDIENTE:
      case EstadoReserva.CANCELADA:
        usuario = reserva.alojamiento.anfitrion;
        break;
      case EstadoReserva.CONFIRMADA:
        usuario = reserva.huespedReservador;
        break;
    }
    return new Notificacion(mensaje, usuario, reserva.fechaAlta);
  }
}
