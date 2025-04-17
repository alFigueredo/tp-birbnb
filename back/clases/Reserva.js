class Reserva {
  constructor(
    fechaAlta,
    huespedReservador,
    cantHuespedes,
    alojamiento,
    rangoFechas,
    estado,
    precioPorNoche,
  ) {
    this.fechaAlta = fechaAlta;
    this.huespedReservador = huespedReservador;
    this.cantHuespedes = cantHuespedes;
    this.alojamiento = alojamiento;
    this.rangoFechas = rangoFechas;
    this.estado = estado;
    this.precioPorNoche = precioPorNoche;
  }

  actualizarEstado(nuevoEstado) {
    this.estado = nuevoEstado;
  }
}

class CambioEstadoReserva {
  constructor(fecha, estado, reserva, motivo, usuario) {
    this.fecha = fecha;
    this.estado = estado;
    this.reserva = reserva;
    this.motivo = motivo;
    this.usuario = usuario;

    this.reserva.actualizarEstado(this.estado);
    crearSegunReserva(this.reserva);
  }
}

class RangoFechas {
  constructor(fechaInicio, fechaFin) {
    this.fechaInicio = fechaInicio;
    this.fechaFin = fechaFin;
  }
  cantidadDias() {}
}
