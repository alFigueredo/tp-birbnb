class Reserva {
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
    this.estado = EstadoReserva.PENDIENTE;
    this.precioPorNoche = precioPorNoche;

    new crearSegunReserva(this);
  }

  actualizarEstado(nuevoEstado) {
    this.estado = nuevoEstado;
  }
}

class CambioEstadoReserva {
  constructor(estado, reserva, motivo, usuario) {
    this.fecha = new Date();
    this.estado = estado;
    this.reserva = reserva;
    this.motivo = motivo;
    this.usuario = usuario;

    this.reserva.actualizarEstado(this.estado);
    if (this.estado === EstadoReserva.CANCELADA)
      new crearSegunReserva(this.reserva).agregarMotivo(this.motivo);
    else new crearSegunReserva(this.reserva);
  }
}

class RangoFechas {
  constructor(fechaInicio, fechaFin) {
    this.fechaInicio = fechaInicio;
    this.fechaFin = fechaFin;
  }

  entreFechas(rangoFechas) {
    return (
      (this.fechaInicio <= rangoFechas.fechaInicio &&
        this.fechaFin > rangoFechas.fechaInicio) ||
      (this.fechaInicio < rangoFechas.fechaFin &&
        this.fechaFin >= rangoFechas.fechaFin) ||
      (this.fechaInicio > rangoFechas.fechaInicio &&
        this.fechaFin < rangoFechas.fechaFin)
    );
  }

  cantidadDias() {
    return Math.floor(this.fechaFin - this.fechaInicio / (1000 * 60 * 60 * 24));
  }
}
