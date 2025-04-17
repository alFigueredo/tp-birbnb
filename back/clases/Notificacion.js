class Notificacion {
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
    mensaje += "\nMotivo: " + motivo;
  }
}

class FactoryNotificacion {
  static crearSegunReserva(reserva) {
    let usuario;
    let mensaje =
      "Huésped: " +
      reserva.huespedReservador +
      "\nFecha: " +
      reserva.rangoDeFechas.fechaInicio.toLocaleDateString() +
      "\nCantidad de días: " +
      reserva.rangoDeFechas.cantidadDias() +
      "\nAlojamiento: " +
      reserva.alojamiento.nombre +
      "\n";
    switch (reserva.estado) {
      case PENDIENTE:
        mensaje += "Estado de la reserva: pendiente";
        usuario = reserva.alojamiento.anfitrion;
        break;
      case CONFIRMADA:
        mensaje += "Estado de la reserva: confirmada";
        usuario = reserva.huespedReservador;
        break;
      case CANCELADA:
        mensaje += "Estado de la reserva: cancelada";
        usuario = reserva.alojamiento.anfitrion;
        break;
    }
    return new Notificacion(mensaje, usuario, reserva.fechaAlta);
  }
}
