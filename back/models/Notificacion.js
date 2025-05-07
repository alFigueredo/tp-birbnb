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
}

export class FactoryNotificacion {
  static crearSegunReserva(reserva, motivo = "") {
    const usuario = reserva.obtenerUsuario();

    mensaje = `Huesped ${reserva.huespedReservador.nombre}
    Fecha: ${reserva.rangoFechas.fechaInicio.toLocaleDateString()}
    Cantidad de días: ${reserva.rangoFechas.cantidadDias()}
    Alojamiento: ${reserva.alojamiento.nombre}
    Estado de la reserva: ${reserva.estado}`;

    if (motivo != "") mensaje += "\nMotivo: " + motivo;

    return new Notificacion(mensaje, usuario, reserva.fechaAlta);
  }
}
