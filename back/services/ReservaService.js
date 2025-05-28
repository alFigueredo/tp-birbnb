import {
  ValidationError,
  NotFoundError,
  ConflictError,
} from "../errors/appError.js";
import { RangoFechas, Reserva } from "../models/entities/Reserva.js";
import { ReservaRepository } from "../models/repositories/ReservaRepository.js";
import { UsuarioRepository } from "../models/repositories/UsuarioRepository.js";
import { AlojamientoRepository } from "../models/repositories/AlojamientoRepository.js";


export class ReservaService {
  constructor(
    reservaRepository = new ReservaRepository(),
    usuarioRepository = new UsuarioRepository(),
    alojamientoRepository = new AlojamientoRepository(),
  ) {
    this.reservaRepository = reservaRepository;
    this.usuarioRepository = usuarioRepository;
    this.alojamientoRepository = alojamientoRepository;
  }

  async findAll() {
    const reservas = await this.reservaRepository.findAll();
    return reservas;
  }

  async create(reserva) {
    const alojamiento = await this.alojamientoRepository.findById(
      reserva.alojamiento,
    );
    if (!alojamiento) {
      throw new NotFoundError(
        `El alojamiento ${reserva.alojamiento} no existe`,
      );
    }
    const usuario = await this.usuarioRepository.findById(
      reserva.huespedReservador,
    );
    if (!usuario) {
      throw new NotFoundError(
        `El usuario ${reserva.huespedReservador} no existe`,
      );
    }

    const rangoFechas = new RangoFechas(
      new Date(reserva.rangoFechas.fechaInicio),
      new Date(reserva.rangoFechas.fechaFin),
    );

    //solo se crea la reserva si el alojamiento esta disponible en las fechas seleccionadas
    if (!alojamiento.estasDisponibleEn(rangoFechas)) {
      throw new ConflictError(
        `El alojamiento ${alojamiento.nombre} no esta disponible en las fechas seleccionadas`,
      );
    }
    if (!alojamiento.puedenAlojarse(reserva.cantHuespedes)) {
      throw new ConflictError(`Cantidad de huéspedes no permitida`);
    }

    const nuevaReserva = new Reserva(
      reserva.huespedReservador,
      reserva.cantHuespedes,
      reserva.alojamiento,
      rangoFechas,
      reserva.precioPorNoche,
    );

    const reservaGuardada = await this.reservaRepository.save(nuevaReserva);

    alojamiento.agregarReserva(reservaGuardada);
    await this.alojamientoRepository.save(alojamiento);

    return reservaGuardada;
  }

  //cancelacion reserva
  async cancelacionReserva(idReserva){
     
    const reserva = await this.reservaRepository.findById(
      idReserva
    );
    if (!reserva.id) {
      throw new NotFoundError(
        `La reserva no existe`,
      );
    }
    if(reserva.RangoFechas.fechaInicio < Date.now()){
      throw new ConflictError(`Fecha limite de cancelacion superada`);
    }
    if(reserva.estado == "CANCELADA"){
      throw new ConflictError(`Esta reserva ya fue cancelada`);
    }
    
    reserva.actualizarEstado("CANCELADA");
    await this.reservaRepository.save(reserva);

    return reserva;
  }

  //historial de reservas de un usuario
  async historialReservas(idUsuario) {
    const usuario = await this.usuarioRepository.findById(idUsuario);
    if (!usuario) {
      throw new NotFoundError(`Usuario con el id ${usuario.id} no existe`);
    }
    const listaReservas = await this.reservaRepository.findAll({
      huespedReservador: idUsuario,
    });
    return listaReservas;
  }

  //modificacion de reserva
  async modificacionReserva(idReserva){
    const reserva = await this.reservaRepository.findById(
      idReserva
    );
    if (!reserva.id) {
      throw new NotFoundError(
        `La reserva no existe`,
      );
    }

    const alojamiento = await this.alojamientoRepository.findById(
      reserva.alojamiento,
    );

    const rangoFechas = new RangoFechas(
      new Date(reserva.rangoFechas.fechaInicio),
      new Date(reserva.rangoFechas.fechaFin),
    );

    if (!alojamiento) {
      throw new NotFoundError(
        `El alojamiento ${reserva.alojamiento} no existe`,
      );
    }
    
    if (!alojamiento.estasDisponibleEn(rangoFechas)) {
      throw new ConflictError(
        `El alojamiento ${alojamiento.nombre} no esta disponible en las fechas seleccionadas`,
      );
    }

    if (!alojamiento.puedenAlojarse(reserva.cantHuespedes)) {
      throw new ConflictError(`Cantidad de huéspedes no permitida`);
    }
    
    //se modifican la cantidad de huespedes
    reserva.modificarCantidadHuespedes(reserva.cantHuespedes);

    //se modifican las fechas de la reserva
    reserva.modificarFechas(rangoFechas);
    
    await this.reservaRepository.save(reserva);
    return reserva;
  }

}
