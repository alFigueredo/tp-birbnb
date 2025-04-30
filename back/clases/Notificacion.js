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
    const usuario = reserva.obtenerUsuario();

    const mensaje = `Huesped ${reserva.huespedReservador.nombre}
    Fecha: ${reserva.rangoFechas.fechaInicio.toLocaleDateString()}
    Cantidad de días: ${reserva.rangoFechas.cantidadDias()}
    Alojamiento: ${reserva.alojamiento.nombre}
    Estado de la reserva: ${reserva.estado}`;

    return new Notificacion(mensaje, usuario, reserva.fechaAlta);
  }
}
