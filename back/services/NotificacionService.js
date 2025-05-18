import { ValidationError, NotFoundError } from "../errors/appError.js";

export class NotificacionService {
  constructor(notificacionRepository) {
    this.notificacionRepository = notificacionRepository;
  }

  async findAll(type) {
    let leida;
    switch (type) {
      case "leida":
        leida = true;
        break;
      case "sinleer":
        leida = false;
        break;
      default:
        throw new ValidationError("Una notificacion puede ser leida o sinleer");
    }
    const notificaciones = await this.notificacionRepository.findAll({ leida });
    return notificaciones;
  }

  async update(id) {
    const notificacion = await this.notificacionRepository.findById(
      idCategoria
    );
    if (!notificacion)
      throw new NotFoundError(`Notificacion con ${id} no encontrado`);
    notificacion.marcarComoLeida();
    const leido = await this.notificacionRepository.save(notificacion);
    return leido;
  }
}
