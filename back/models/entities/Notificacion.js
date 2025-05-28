export class Notificacion {
  constructor(mensaje, usuario) {
    this.mensaje = mensaje;
    this.usuario = usuario; // Usuario
    this.fechaAlta = Date.now();
    this.leida = false;
    this.fechaLeida = null;
  }

  marcarComoLeida() {
    if (!this.leida) {
      this.leida = true;
      this.fechaLeida = Date.now();
    }
  }
}

export class FactoryNotificacion {
  static crearSegunReserva(reserva, motivo = "") {
    const usuario = reserva.obtenerUsuario();

    const mensaje = `Huesped: ${reserva.huespedReservador.nombre}
    Fecha: ${reserva.rangoFechas.fechaInicio.toLocaleDateString()}
    Cantidad de días: ${reserva.rangoFechas.cantidadDias()}
    Alojamiento: ${reserva.alojamiento.nombre}
    Estado de la reserva: ${reserva.estado}`;

    if (motivo != "") mensaje += "\nMotivo: " + motivo;

    return new Notificacion(mensaje, usuario, reserva.fechaAlta);
  }
}
