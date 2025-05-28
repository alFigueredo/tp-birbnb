export const Estados = {
  PENDIENTE: () => Pendiente,
  CANCELADA: () => Cancelada,
  CONFIRMADA: () => Confirmada,
  RECHAZADA: () => Rechazada,
};

class Estado {
  obtenerUsuario(_reserva) {}
}

// Tipos de Estado
export class Pendiente extends Estado {
  static obtenerUsuario(reserva) {
    return reserva.alojamiento.anfitrion;
  }
}

export class Cancelada extends Estado {
  static obtenerUsuario(reserva) {
    return reserva.alojamiento.anfitrion;
  }
}

export class Confirmada extends Estado {
  static obtenerUsuario(reserva) {
    return reserva.huespedReservador;
  }
}

export class Rechazada extends Estado {
  static obtenerUsuario(reserva) {
    return reserva.huespedReservador;
  }
}

export class CambioEstadoReserva {
  constructor(estado, reserva, motivo, usuario) {
    this.fecha = Date.now();
    this.estado = estado;
    this.reserva = reserva;
    this.motivo = motivo;
    this.usuario = usuario;

    this.reserva.actualizarEstado(this.estado);
  }
}
