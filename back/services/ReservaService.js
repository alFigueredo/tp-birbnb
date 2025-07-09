import { NotFoundError, ConflictError } from "../errors/appError.js";
import { RangoFechas, Reserva } from "../models/entities/Reserva.js";
import { ReservaRepository } from "../models/repositories/ReservaRepository.js";
import { UsuarioRepository } from "../models/repositories/UsuarioRepository.js";
import { AlojamientoRepository } from "../models/repositories/AlojamientoRepository.js";
import { NotificacionRepository } from "../models/repositories/NotificacionRepository.js";
import { CambioEstadoReserva } from "../models/entities/CambioEstadoReserva.js";

export class ReservaService {
  constructor(
    reservaRepository = new ReservaRepository(),
    usuarioRepository = new UsuarioRepository(),
    alojamientoRepository = new AlojamientoRepository(),
    notificacionRepository = new NotificacionRepository(),
  ) {
    this.reservaRepository = reservaRepository;
    this.usuarioRepository = usuarioRepository;
    this.alojamientoRepository = alojamientoRepository;
    this.notificacionRepository = notificacionRepository;
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
      new Date(reserva.rangoFechas.fechaInicio.split("T")[0]),
      new Date(reserva.rangoFechas.fechaFin.split("T")[0]),
    );

    if (rangoFechas.fechaInicio < Date.now()) {
      throw new ConflictError(`La fecha de inicio del alojamiento ya pasó`);
    }

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
      usuario,
      reserva.cantHuespedes,
      alojamiento,
      rangoFechas,
      reserva.precioPorNoche,
    );

    const reservaGuardada = await this.reservaRepository.save(nuevaReserva);

    alojamiento.agregarReserva(reservaGuardada);
    await this.alojamientoRepository.save(alojamiento);

    await this.notificacionRepository.create(nuevaReserva);

    return reservaGuardada;
  }

  //cancelacion reserva
  async cancelacionReserva(idReserva, body) {
    const reserva = await this.reservaRepository.findById(idReserva);
    if (!reserva) {
      throw new NotFoundError(`La reserva no existe`);
    }
    if (reserva.rangoFechas.fechaInicio < Date.now()) {
      throw new ConflictError(`Fecha limite de cancelacion superada`);
    }
    if (reserva.estado == "CANCELADA") {
      throw new ConflictError(`Esta reserva ya fue cancelada`);
    }

    const motivo = !body || !body.motivo ? "" : body.motivo;
    const cambioEstado = new CambioEstadoReserva(
      "CANCELADA",
      reserva,
      motivo,
      reserva.huespedReservador,
    );
    await this.reservaRepository.save(cambioEstado.reserva);
    await this.notificacionRepository.create(
      cambioEstado.reserva,
      cambioEstado.motivo,
    );

    return reserva;
  }

  //historial de reservas de un usuario
  async historialReservas(idUsuario) {
    const usuario = await this.usuarioRepository.findById(idUsuario);
    if (!usuario) {
      throw new NotFoundError(`Usuario con el id ${usuario} no existe`);
    }
    const listaReservas = await this.reservaRepository.findAll({
      huespedReservador: idUsuario,
    });
    return listaReservas;
  }

  async reservasAnfitrion(idUsuario) {
    const usuario = await this.usuarioRepository.findById(idUsuario);
    if (!usuario) {
      throw new NotFoundError(`Usuario con el id ${usuario} no existe`);
    }

    const alojamientos = await this.alojamientoRepository.findByAnfitrion(
      usuario._id,
    );

    const listaReservas =
      await this.reservaRepository.findByAlojamientos(alojamientos);

    return listaReservas;
  }

  //modificacion de reserva
  async modificacionReserva(idReserva, nuevaReserva) {
    const reserva = await this.reservaRepository.findById(idReserva);
    if (!reserva) {
      throw new NotFoundError(`La reserva no existe`);
    }

    const alojamiento = await this.alojamientoRepository.findById(
      reserva.alojamiento,
    );

    if (!alojamiento) {
      throw new NotFoundError(
        `El alojamiento ${reserva.alojamiento} no existe`,
      );
    }

    const rangoFechas = new RangoFechas(
      new Date(nuevaReserva.rangoFechas.fechaInicio.split("T")[0]),
      new Date(nuevaReserva.rangoFechas.fechaFin.split("T")[0]),
    );

    if (
      rangoFechas.equals(reserva.rangoFechas) &&
      nuevaReserva.cantHuespedes == reserva.cantHuespedes
    )
      throw new ConflictError(`Ningún dato ha sido modificado`);

    if (rangoFechas.fechaInicio < Date.now()) {
      throw new ConflictError(`La fecha de inicio del alojamiento ya pasó`);
    }

    if (!alojamiento.estasDisponibleEn(rangoFechas, idReserva)) {
      throw new ConflictError(
        `El alojamiento ${alojamiento.nombre} no esta disponible en las fechas seleccionadas`,
      );
    }
    //se modifican las fechas de la reserva
    reserva.modificarFechas(rangoFechas);

    if (!alojamiento.puedenAlojarse(nuevaReserva.cantHuespedes)) {
      throw new ConflictError(`Cantidad de huéspedes no permitida`);
    }
    //se modifican la cantidad de huespedes
    reserva.modificarCantidadHuespedes(nuevaReserva.cantHuespedes);

    const cambioEstado = new CambioEstadoReserva(
      "PENDIENTE",
      reserva,
      "",
      reserva.huespedReservador,
    );
    const reservaActualizada = await this.reservaRepository.save(
      cambioEstado.reserva,
    );
    await this.notificacionRepository.create(cambioEstado.reserva);

    return reservaActualizada;
  }

  //cancelacion reserva
  async confirmacionReserva(idReserva) {
    const reserva = await this.reservaRepository.findById(idReserva);
    if (!reserva) {
      throw new NotFoundError(`La reserva no existe`);
    }
    if (reserva.rangoFechas.fechaInicio < Date.now()) {
      throw new ConflictError(`Fecha limite de confirmacion superada`);
    }
    if (reserva.estado == "CONFIRMADA") {
      throw new ConflictError(`Esta reserva ya fue confirmada`);
    }

    const cambioEstado = new CambioEstadoReserva(
      "CONFIRMADA",
      reserva,
      "",
      reserva.alojamiento.anfitrion,
    );
    await this.reservaRepository.save(cambioEstado.reserva);
    await this.notificacionRepository.create(cambioEstado.reserva);

    // await this.notificacionRepository.create(
    //   cambioEstado.reserva,
    //   `Horario Check-in: ${cambioEstado.reserva.alojamiento.horarioCheckIn}`,
    // );
    // await this.notificacionRepository.create(
    //   cambioEstado.reserva,
    //   `Horario Check-out: ${cambioEstado.reserva.alojamiento.horarioCheckOut}`,
    // );

    return reserva;
  }

  //cancelacion reserva
  async rechazoReserva(idReserva, body) {
    const reserva = await this.reservaRepository.findById(idReserva);
    if (!reserva) {
      throw new NotFoundError(`La reserva no existe`);
    }
    if (reserva.estado == "RECHAZADA") {
      throw new ConflictError(`Esta reserva ya fue rechazada`);
    }

    const motivo = !body || !body.motivo ? "" : body.motivo;
    const cambioEstado = new CambioEstadoReserva(
      "RECHAZADA",
      reserva,
      motivo,
      reserva.alojamiento.anfitrion,
    );

    await this.reservaRepository.save(cambioEstado.reserva);
    await this.notificacionRepository.create(
      cambioEstado.reserva,
      cambioEstado.motivo,
    );

    return reserva;
  }
}
