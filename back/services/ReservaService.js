import { ValidationError, NotFoundError, ConflictError } from "../errors/appError.js";
import { Reserva } from "../models/entities/Reserva.js";
import { ReservaRepository } from "../models/repositories/ReservaRepository.js";
import { UsuarioRepository } from "../models/repositories/UsuarioRepository.js";
import { AlojamientoRepository } from "../models/repositories/AlojamientoRepository.js";

/*
Gestión de Reservas
La plataforma debe permitir a los usuarios realizar reservas sobre los alojamientos disponibles. Esto implica la implementación de endpoints que gestionen el ciclo de vida de una reserva:
1) Creación de una reserva, asegurando la disponibilidad del alojamiento en las fechas seleccionadas.
2) Cancelación de una reserva antes de su fecha de inicio.
3) Consulta del historial de reservas de un usuario.
4) Modificación de una reserva dentro de las reglas establecidas por el Sistema (por ejemplo, cambios de fechas si el alojamiento sigue disponible).

DUDAS:
1) Si el alojamiento no esta disponible se tira mensaje de error? Validation o Conflict?
2) El usuario ya cancelo la reserva y nosotros tenemos que verificar que sea ANTES de su fecha de inicio correspondiente o directamente validar para no dejarle al usuario cancelar si se pasa de fecha
3) La unica forma de acceder a una lista de reservas es mediante alojamiento y recien ahí accedemos a su huesped reservador
4) 
*/

export class ReservaService {
    constructor(reservaRepository = new ReservaRepository(), usuarioRepository = new UsuarioRepository(),
        alojamientoRepository = new AlojamientoRepository()){
        this.reservaRepository = reservaRepository
        this.usuarioRepository = usuarioRepository
        this.alojamientoRepository = alojamientoRepository
    }


    async findAll(){
        const reservas = await this.reservaRepository.findAll();
        return reservas;
    }

    async create(reserva){
        // const alojamiento = await this.alojamientoRepository.findById(reserva.alojamiento);
        // if (alojamiento) {
        //     throw new NotFoundError(`El alojamiento ${reserva.alojamiento} no existe`)
        // }

        //solo se crea la reserva si el alojamiento esta disponible en las fechas seleccionadas
        if (!reserva.alojamiento.estasDisponibleEn(reserva.rangoFechas)){
            throw new ConflictError(`El alojamiento ${reserva.alojamiento.nombre} no esta disponible en las fechas seleccionadas`);
        }
        if (!reserva.alojamiento.puedenAlojarse(reserva.cantHuespedes)) {
            throw new ConflictError(`Cantidad de huéspedes no permitida`)
        }
        const nuevaReserva = new Reserva(reserva.huespedReservador, reserva.cantHuespedes, reserva.alojamiento, reserva.rangoFechas, reserva.precioPorNoche);
        const reservaGuardada = await this.reservaRepository.save(nuevaReserva);

        return reservaGuardada;
    }

    //cancelacion reserva

    //historial de reservas de un usuario
    async historialReservas(idUsuario){
        const usuario = await this.usuarioRepository.findById(idUsuario)
        if (!usuario){
            throw new NotFoundError(`Usuario con el id ${usuario.id} no existe`);
        }
        const listaReservas = await this.reservaRepository.findAll({huespedReservador: idUsuario});
        return listaReservas;
    }
}


