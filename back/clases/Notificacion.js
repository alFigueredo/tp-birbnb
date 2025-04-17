class Notificacion {
  constructor(mensaje, usuario, fechaAlta) {
    this.mensaje = mensaje;
    this.usuario = usuario; // Usuario
    this.fechaAlta = fechaAlta;
    this.leida = false;
    this.fechaLeida = null;
  }

  marcarComoLeida() {
    this.leida = true;
    this.fechaLeida = new Date();
  }
}

class FactoryNotificacion {
  crearSegunReserva(reserva) {
    let usuario;
    let mensaje = "";
    mensaje += "Huésped: " + reserva.huespedReservador + "; ";
    mensaje +=
      "Fecha: " + reserva.rangoDeFechas.fechaInicio.toLocaleDateString() + "; ";
    mensaje +=
      "Cantidad de días: " + reserva.rangoDeFechas.cantidadDias() + "; ";
    mensaje += "Alojamiento: " + reserva.alojamiento.nombre + "; ";
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
