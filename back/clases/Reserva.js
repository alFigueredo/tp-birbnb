import { EstadoReserva } from "../enumeraciones.js";
import { FactoryNotificacion } from "./Notificacion.js";

export class Reserva {

  static estadoReserva = {
    PENDIENTE: 'PENDIENTE',
    CANCELADA: 'CANCELADA',
    CONFIRMADA: 'CONFIRMADA'
  }
  static usuarioSegunEstado = {
    [Reserva.Estados.PENDIENTE]: (reserva) => reserva.alojamiento.anfitrion,
    [Reserva.Estados.CANCELADA]: (reserva) => reserva.alojamiento.anfitrion,
    [Reserva.Estados.CONFIRMADA]: (reserva) => reserva.huespedReservador,
  };
  
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
    this.estado = Reserva.estadoReserva.PENDIENTE 
    this.precioPorNoche = precioPorNoche;

    // Crea notificación
    // const notificacion = FactoryNotificacion.crearSegunReserva(this);
    // console.log(notificacion.mensaje);
  }

  actualizarEstado(nuevoEstado) {
    this.estado = nuevoEstado;
  }

  obtenerUsuario(){
    const usuarioANotificar = Reserva.usuarioSegunEstado[this.estado]

    if(!usuarioANotificar){
      throw new Error(`No hay registro del usuario para el estado: ${this.estado}`);
    }
    return usuarioANotificar(this);
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

export class RangoFechas {
  constructor(fechaInicio, fechaFin) {
    this.fechaInicio = fechaInicio;
    this.fechaFin = fechaFin;

    // test si cumple
  }

  entreFechas(rangoFechas) {
    return (
      this.fechaInicio < rangoFechas.fechaFin &&
      this.fechaFin > rangoFechas.fechaInicio
    );
  }

  cantidadDias() {
    return Math.floor(
      (this.fechaFin - this.fechaInicio) / (1000 * 60 * 60 * 24),
    );
  }
}
