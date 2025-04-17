// Clases

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
    fotos
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

  estasDisponibleEn(rangoDeFechas) {
    this.reservas.forEach(
      (reserva) =>
        reserva.rangoFechas.fechaInicio != rangoDeFechas.fechaInicio &&
        reserva.rangoFechas.fechaFin != rangoDeFechas.fechaFin &&
        reserva.estado == EstadoReserva.CANCELADA
    );
  }
  tuPrecioEstaDentroDe(valorMinimo, valorMaximo) {
    return (
      this.precioPorNoche >= valorMinimo && this.precioPorNoche <= valorMaximo
    );
  }
  tenesCaracteristica(caracteristica) {
    this.caracteristicas.includes(caracteristica)
  }
  puedenAlojarse(cantHuespedes) {
    return this.cantHuespedesMax <= cantHuespedes;
  }
}

class Reserva {
  constructor(
    fechaAlta,
    huespedReservador,
    cantHuespedes,
    alojamiento,
    rangoFechas,
    estado,
    precioPorNoche
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
  }
}

class RangoFechas {
  constructor(fechaInicio, fechaFin) {
    this.fechaInicio = fechaInicio;
    this.fechaFin = fechaFin;
  }
}

class FactoryNotificacion {
  crearSegunReserva(reserva) {
    // Devuelve una Notificación
  }
}

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

class Foto {
  constructor(descripcion, path) {
    this.descripcion = descripcion;
    this.path = path;
  }
}

// DIRECCIONES
class Direccion {
  constructor(calle, altura, ciudad, lat, long) {
    this.calle = calle;
    this.altura = altura;
    this.ciudad = ciudad; // Ciudad
    this.lat = lat;
    this.long = long;
  }
}
class Ciudad {
  constructor(nombre, pais) {
    this.nombre = nombre;
    this.pais = pais;
  }
}

class Pais {
  constructor(nombre) {
    this.nombre = nombre;
  }
}

// USUARIO
class Usuario {
  constructor(nombre, email, tipo) {
    this.nombre = nombre;
    this.email = email;
    this.tipo = tipo; // TipoUsuario
  }
}
