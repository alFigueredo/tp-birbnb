class Alojamiento {
  constructor(
    anfitrion,
    nombre,
    descripcion,
    precioPorNoche,
    moneda,
    horarioCheckIn,
    horarioCheckOut,
    direccion,
    cantHuespedesMax,
    caracteristicas,
    reservas,
    fotos,
  ) {
    this.anfitrion = anfitrion;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precioPorNoche = precioPorNoche;
    this.moneda = moneda;
    this.horarioCheckIn = horarioCheckIn;
    this.horarioCheckOut = horarioCheckOut;
    this.direccion = direccion;
    this.cantHuespedesMax = cantHuespedesMax;
    this.caracteristicas = caracteristicas; //Lista Enumeraciones
    this.reservas = reservas;
    this.fotos = fotos;
  }

  fechaEntre(reservaRangoFechas, rangoFechas) {
    return (
      (reservaRangoFechas.fechaInicio <= rangoFechas.fechaInicio &&
        reservaRangoFechas.fechaFin >= rangoFechas.fechaInicio) ||
      (reservaRangoFechas.fechaInicio <= rangoFechas.fechaFin &&
        reservaRangoFechas.fechaFin >= rangoFechas.fechaFin)
    );
  }

  estasDisponibleEn(rangoDeFechas) {
    return !this.reservas.some(
      (reserva) =>
        fechaEntre(reserva.rangoFechas, rangoDeFechas) &&
        reserva.estado !== EstadoReserva.CANCELADA,
    );
  }
  tuPrecioEstaDentroDe(valorMinimo, valorMaximo) {
    return (
      this.precioPorNoche >= valorMinimo && this.precioPorNoche <= valorMaximo
    );
  }
  tenesCaracteristica(caracteristica) {
    return this.caracteristicas.includes(caracteristica);
  }
  puedenAlojarse(cantHuespedes) {
    return this.cantHuespedesMax >= cantHuespedes;
  }
}

class Foto {
  constructor(descripcion, path) {
    this.descripcion = descripcion;
    this.path = path;
  }
}
