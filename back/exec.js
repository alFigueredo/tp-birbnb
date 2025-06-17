import {
  Alojamiento,
  Caracteristica,
  Foto,
  Moneda,
} from "./models/entities/Alojamiento.js";
import { Ciudad, Direccion, Pais } from "./models/entities/Direccion.js";
import { Notificacion } from "./models/entities/Notificacion.js";
import { RangoFechas, Reserva } from "./models/entities/Reserva.js";
import { TipoUsuario, Usuario } from "./models/entities/Usuario.js";
import {
  AlojamientoModel,
  FotoModel,
} from "./models/schemas/AlojamientoSchema.js";
import { CiudadModel, PaisModel } from "./models/schemas/DireccionSchema.js";
import { NotificacionModel } from "./models/schemas/NotificacionSchema.js";
import { ReservaModel } from "./models/schemas/ReservaSchema.js";
import { UsuarioModel } from "./models/schemas/UsuarioSchema.js";

export async function exec() {
  await UsuarioModel.deleteMany();
  await NotificacionModel.deleteMany();
  await FotoModel.deleteMany();
  await PaisModel.deleteMany();
  await CiudadModel.deleteMany();
  await AlojamientoModel.deleteMany();
  await ReservaModel.deleteMany();

  const usuarios = [
    new UsuarioModel(
      new Usuario("John Doe", "johndoe@gmail.com", TipoUsuario.HUESPED),
    ),
    new UsuarioModel(
      new Usuario("Juan Doe", "juandoe@gmail.com", TipoUsuario.HUESPED),
    ),
    new UsuarioModel(
      new Usuario("Juana Doe", "juanadoe@gmail.com", TipoUsuario.HUESPED),
    ),
  ];

  const notificaciones = [
    new NotificacionModel(new Notificacion("Mensaje 1", usuarios[0])),
    new NotificacionModel(new Notificacion("Mensaje 2", usuarios[1])),
    new NotificacionModel(new Notificacion("Mensaje 3", usuarios[2])),
    new NotificacionModel(new Notificacion("Mensaje 4", usuarios[1])),
    new NotificacionModel(new Notificacion("Mensaje 5", usuarios[2])),
  ];

  const anfitriones = [
    new UsuarioModel(
      new Usuario("Jane Doe", "janedoe@gmail.com", TipoUsuario.ANFITRION),
    ),
  ];

  const rangoFechas = [
    new RangoFechas(new Date(2025, 7, 1), new Date(2025, 7, 3)),
    new RangoFechas(new Date(2025, 7, 4), new Date(2025, 7, 6)),
    new RangoFechas(new Date(2025, 7, 7), new Date(2025, 7, 9)),
    new RangoFechas(new Date(2025, 7, 10), new Date(2025, 7, 12)),
    new RangoFechas(new Date(2025, 7, 13), new Date(2025, 7, 15)),
  ];

  const fotos = [new FotoModel(new Foto("Foto 1", "foto1"))];

  const paises = [
    new PaisModel(new Pais("Pais 1")),
    new PaisModel(new Pais("Pais 2")),
  ];

  const ciudades = [
    new CiudadModel(new Ciudad("Ciudad 1", paises[0])),
    new CiudadModel(new Ciudad("Ciudad 2", paises[1])),
  ];

  const direcciones = [
    new Direccion("Calle Falsa", 123, ciudades[0], "1", "1"),
    new Direccion("Calle Falsa", 123, ciudades[1], "2", "2"),
    new Direccion("Calle Falsa", 123, ciudades[1], "1", "2"),
  ];

  const alojamientos = [
    new AlojamientoModel(
      new Alojamiento(
        anfitriones[0],
        "Alojamiento 1",
        "Alojamiento 1",
        7000,
        Moneda.PESO_ARG,
        "14:00",
        "10:00",
        direcciones[0],
        5,
        [Caracteristica.WIFI, Caracteristica.ESTACIONAMIENTO],
        fotos[0],
      ),
    ),

    new AlojamientoModel(
      new Alojamiento(
        anfitriones[0],
        "Alojamiento 2",
        "Alojamiento 2",
        6000,
        Moneda.PESO_ARG,
        "14:00",
        "10:00",
        direcciones[1],
        6,
        [Caracteristica.WIFI, Caracteristica.ESTACIONAMIENTO],
        fotos[0],
      ),
    ),

    new AlojamientoModel(
      new Alojamiento(
        anfitriones[0],
        "Alojamiento 3",
        "Alojamiento 3",
        8000,
        Moneda.PESO_ARG,
        "14:00",
        "10:00",
        direcciones[2],
        7,
        [
          Caracteristica.WIFI,
          Caracteristica.ESTACIONAMIENTO,
          Caracteristica.PISCINA,
        ],
        fotos[0],
      ),
    ),

    new AlojamientoModel(
      new Alojamiento(
        anfitriones[0],
        "Alojamiento 4",
        "Alojamiento 4",
        7000,
        Moneda.PESO_ARG,
        "14:00",
        "10:00",
        direcciones[0],
        5,
        [Caracteristica.WIFI, Caracteristica.MASCOTAS_PERMITIDAS],
        fotos[0],
      ),
    ),
  ];

  const reservas = [
    new ReservaModel(
      new Reserva(usuarios[0], 3, alojamientos[0], rangoFechas[0], 7000),
    ),
    new ReservaModel(
      new Reserva(usuarios[1], 3, alojamientos[0], rangoFechas[1], 7000),
    ),
    new ReservaModel(
      new Reserva(usuarios[2], 3, alojamientos[0], rangoFechas[2], 7000),
    ),
    new ReservaModel(
      new Reserva(usuarios[1], 3, alojamientos[0], rangoFechas[3], 7000),
    ),
    new ReservaModel(
      new Reserva(usuarios[2], 3, alojamientos[0], rangoFechas[4], 7000),
    ),
  ];
  reservas.map((reserva) => alojamientos[0].agregarReserva(reserva));

  usuarios.map(async (usuario) => await usuario.save());
  notificaciones.map(async (notificaciones) => await notificaciones.save());
  anfitriones.map(async (anfitrion) => await anfitrion.save());
  fotos.map(async (foto) => await foto.save());
  paises.map(async (pais) => await pais.save());
  ciudades.map(async (ciudad) => await ciudad.save());
  alojamientos.map(async (alojamiento) => await alojamiento.save());
  reservas.map(async (reserva) => await reserva.save());

  console.log("Database setted");
}
