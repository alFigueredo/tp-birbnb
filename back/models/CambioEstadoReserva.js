class Estado {
  obtenerUsuario(_reserva) {}
}

// Tipos de Estado
export class Pendiente extends Estado {
  estado = "PENDIENTE";
  obtenerUsuario(reserva) {
    return reserva.alojamiento.anfitrion;
  }
}

export class Cancelada extends Estado {
  estado = "CANCELADA";
  obtenerUsuario(reserva) {
    reserva.alojamiento.anfitrion;
  }
}

export class Confirmada extends Estado {
  estado = "CONFIRMADA";
  obtenerUsuario(reserva) {
    reserva.huespedReservador;
  }
}

export class CambioEstadoReserva {
  constructor(estado, reserva, motivo, usuario) {
    this.fecha = new Date();
    this.estado = estado;
    this.reserva = reserva;
    this.motivo = motivo;
    this.usuario = usuario;

    this.reserva.actualizarEstado(this.estado);
  }
}
