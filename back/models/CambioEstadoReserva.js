import { reserva } from "./Reserva.js";

// Tipos de Estado
export const pendiente = {
  estado: "PENDIENTE",
  obtenerUsuario: (reserva) => {
    reserva.alojamiento.anfitrion;
  },
};

export const cancelada = {
  estado: "CANCELADA",
  obtenerUsuario: (reserva) => {
    reserva.alojamiento.anfitrion;
  },
};

export const confirmada = {
  estado: "CONFIRMADA",
  obtenerUsuario: (reserva) => {
    reserva.huespedReservador;
  },
};

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
