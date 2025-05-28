export class Alojamiento {
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
    this.reservas = [];
    this.fotos = fotos;
  }

  estasDisponibleEn(rangoDeFechas) {
    return !this.reservas.some(
      (reserva) =>
        reserva.rangoFechas.entreFechas(rangoDeFechas) &&
        reserva.estado !== "CANCELADA",
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
  agregarReserva(reserva) {
    this.reservas.push(reserva);
  }
}

export class Foto {
  constructor(descripcion, path) {
    this.descripcion = descripcion;
    this.path = path;
  }
}

export const Caracteristica = {
  WIFI: "WIFI",
  PISCINA: "PISCINA",
  MASCOTAS_PERMITIDAS: "MASCOTAS_PERMITIDAS",
  ESTACIONAMIENTO: "ESTACIONAMIENTO",
};

export const Moneda = {
  DOLAR_USA: "DOLAR_USA",
  PESO_ARG: "PESO_ARG",
  REALES: "REALES",
};
