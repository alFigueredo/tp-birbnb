import {
  ValidationError,
  NotFoundError,
  ConflictError,
} from "../errors/appError.js";
import { NotificacionRepository } from "../models/repositories/NotificacionRepository.js";
import { ReservaRepository } from "../models/repositories/ReservaRepository.js";
import { UsuarioRepository } from "../models/repositories/UsuarioRepository.js";

export class NotificacionService {
  constructor(
    notificacionRepository = new NotificacionRepository(),
    usuarioRepository = new UsuarioRepository(),
    reservaRepository = new ReservaRepository(),
  ) {
    this.notificacionRepository = notificacionRepository;
    this.usuarioRepository = usuarioRepository;
    this.reservaRepository = reservaRepository;
  }

  async findAll() {
    const notificaciones = await this.notificacionRepository.findAll();
    return notificaciones;
  }

  async findByUsuario(idUsuario, type) {
    const usuario = await this.usuarioRepository.findById(idUsuario);
    if (!usuario) throw new NotFoundError(`Usuario ${idUsuario} no encontrado`);
    let query = { usuario: idUsuario };
    switch (type) {
      case "leida":
        query.leida = true;
        break;
      case "sinleer":
        query.leida = false;
        break;
      case "todo":
      case undefined:
        break;
      default:
        throw new ValidationError(
          "Una notificacion solo puede ser leida, sinleer o todo",
        );
    }
    const notificaciones = await this.notificacionRepository.findAll(query);
    return notificaciones;
  }

  async update(id) {
    const notificacion = await this.notificacionRepository.findById(id);
    if (!notificacion)
      throw new NotFoundError(`Notificacion con id:${id} no encontrado`);
    if (notificacion.leida)
      throw new ConflictError(`Notificacion con id:${id} ya leida`);
    notificacion.marcarComoLeida();
    const leido = await this.notificacionRepository.save(notificacion);
    return leido;
  }
}
