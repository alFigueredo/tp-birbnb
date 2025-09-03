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
      new Usuario("Marta Aguero", "maguero@gmail.com", TipoUsuario.HUESPED),
    ),
    new UsuarioModel(
      new Usuario("Carlos Perez", "cperez@gmail.com", TipoUsuario.HUESPED),
    ),
  ];

  const notificaciones = [
    new NotificacionModel(
      new Notificacion("¡Gracias por reservar con nosotros!", usuarios[0]),
    ),
    new NotificacionModel(
      new Notificacion(
        "¡Oferta especial! 20% de descuento en todos los productos hasta la medianoche.",
        usuarios[1],
      ),
    ),
    new NotificacionModel(new Notificacion("Mensaje 3", usuarios[2])),
    new NotificacionModel(
      new Notificacion(
        "¡Esperamos que hayas disfrutado de tu estancia! ¿Podrías dejarnos una evaluación sobre tu experiencia en  Tu opinión es importante para nosotros",
        usuarios[1],
      ),
    ),
    new NotificacionModel(new Notificacion("Mensaje 5", usuarios[2])),
  ];

  const anfitriones = [
    new UsuarioModel(
      new Usuario("Jane Doe", "janedoe@gmail.com", TipoUsuario.ANFITRION),
    ),
  ];

  const anioActualMasUno = new Date().getFullYear() + 1;

  const rangoFechas = [
    new RangoFechas(
      new Date(anioActualMasUno, 7, 1),
      new Date(anioActualMasUno, 7, 3),
    ),
    new RangoFechas(
      new Date(anioActualMasUno, 7, 4),
      new Date(anioActualMasUno, 7, 6),
    ),
    new RangoFechas(
      new Date(anioActualMasUno, 7, 7),
      new Date(anioActualMasUno, 7, 9),
    ),
    new RangoFechas(
      new Date(anioActualMasUno, 7, 10),
      new Date(anioActualMasUno, 7, 12),
    ),
    new RangoFechas(
      new Date(anioActualMasUno, 7, 13),
      new Date(anioActualMasUno, 7, 15),
    ),
  ];

  const fotos = [
    new FotoModel(new Foto("Foto casa 1", "/fotos/casa1.jpg")),
    new FotoModel(new Foto("Foto casa 2", "/fotos/casa2.jpg")),
    new FotoModel(new Foto("Foto casa 3", "/fotos/casa3.jpg")),
    new FotoModel(new Foto("Foto casa 4", "/fotos/casa4.jpg")),
    new FotoModel(new Foto("Foto casa 5", "/fotos/casa5.jpg")),
    new FotoModel(new Foto("Foto casa 6", "/fotos/casa6.jpg")),
    new FotoModel(new Foto("Foto casa 7", "/fotos/casa7.jpg")),
    new FotoModel(new Foto("Foto casa 8", "/fotos/casa8.jpg")),
    new FotoModel(new Foto("Foto casa 9", "/fotos/casa9.jpg")),
    new FotoModel(new Foto("Foto casa 10", "/fotos/casa10.jpg")),
    new FotoModel(new Foto("Foto casa 11", "/fotos/casa11.jpg")),
    new FotoModel(new Foto("Foto casa 12", "/fotos/casa12.jpg")),
    new FotoModel(new Foto("Foto casa 13", "/fotos/casa13.jpg")),
    new FotoModel(new Foto("Foto casa 14", "/fotos/casa14.jpg")),
    new FotoModel(new Foto("Foto casa 15", "/fotos/casa15.jpg")),
    new FotoModel(new Foto("Foto casa 16", "/fotos/casa16.jpg")),
  ];

  const paises = [
    new PaisModel(new Pais("Argentina")),
    new PaisModel(new Pais("Brasil")),
  ];

  const ciudades = [
    new CiudadModel(new Ciudad("Buenos Aires", paises[0])),
    new CiudadModel(new Ciudad("Rio de Janeiro", paises[1])),
  ];

  const direcciones = [
    new Direccion("Avenida Corrientes", 1234, ciudades[0], "1", "1"),
    new Direccion("Calle Defensa", 876, ciudades[0], "2", "2"),
    new Direccion("Avenida Santa Fe", 3200, ciudades[0], "1", "2"),
    new Direccion("Calle Lavalle", 234, ciudades[0], "1", "2"),
    new Direccion("Avenida Rivadavia", 5600, ciudades[0], "1", "3"),
    new Direccion("Calle Florida", 100, ciudades[0], "3", "3"),
    new Direccion("Avenida Belgrano", 900, ciudades[0], "3", "1"),
    new Direccion("Calle Suipacha", 350, ciudades[0], "4", "6"),
    new Direccion("Avenida Callao", 1500, ciudades[0], "6", "1"),
    new Direccion("Avenida Atlântica", 1702, ciudades[1], "1", "1"),
  ];

  const alojamientos = [
    new AlojamientoModel(
      new Alojamiento(
        anfitriones[0],
        "Hotel Corrientes Palace",
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
        "Posada Defensa Colonial",
        "Alojamiento 2",
        6000,
        Moneda.PESO_ARG,
        "14:00",
        "10:00",
        direcciones[1],
        6,
        [Caracteristica.WIFI, Caracteristica.ESTACIONAMIENTO],
        [fotos[1], fotos[14], fotos[15]],
      ),
    ),

    new AlojamientoModel(
      new Alojamiento(
        anfitriones[0],
        "Santa Fe Executive Suites",
        "Alojamiento 3",
        8000,
        Moneda.PESO_ARG,
        "14:00",
        "10:00",
        direcciones[2],
        7,
        [Caracteristica.WIFI, Caracteristica.ESTACIONAMIENTO],
        fotos[2],
      ),
    ),

    new AlojamientoModel(
      new Alojamiento(
        anfitriones[0],
        "Residencia Lavalle",
        "Alojamiento 4",
        7000,
        Moneda.PESO_ARG,
        "14:00",
        "10:00",
        direcciones[3],
        5,
        [Caracteristica.WIFI, Caracteristica.MASCOTAS_PERMITIDAS],
        fotos[3],
      ),
    ),
    new AlojamientoModel(
      new Alojamiento(
        anfitriones[0],
        "Miravida SOHO",
        "Alojamiento 5",
        7000,
        Moneda.PESO_ARG,
        "14:00",
        "10:00",
        direcciones[4],
        5,
        [Caracteristica.WIFI, Caracteristica.ESTACIONAMIENTO],
        fotos[4],
      ),
    ),
    new AlojamientoModel(
      new Alojamiento(
        anfitriones[0],
        "Infinity Copacabana hotel",
        "Alojamiento 6",
        8000,
        Moneda.PESO_ARG,
        "14:00",
        "10:00",
        direcciones[9],
        5,
        [Caracteristica.WIFI, Caracteristica.ESTACIONAMIENTO],
        fotos[5],
      ),
    ),
    new AlojamientoModel(
      new Alojamiento(
        anfitriones[0],
        "Argenta Suites",
        "Alojamiento 7",
        10000,
        Moneda.PESO_ARG,
        "14:00",
        "10:00",
        direcciones[5],
        5,
        [
          Caracteristica.WIFI,
          Caracteristica.ESTACIONAMIENTO,
          Caracteristica.PISCINA,
        ],
        fotos[6],
      ),
    ),
    new AlojamientoModel(
      new Alojamiento(
        anfitriones[0],
        "Ayres de Recoleta Plaza",
        "Alojamiento 8",
        7500,
        Moneda.PESO_ARG,
        "14:00",
        "10:00",
        direcciones[6],
        5,
        [Caracteristica.WIFI, Caracteristica.ESTACIONAMIENTO],
        fotos[7],
      ),
    ),
    new AlojamientoModel(
      new Alojamiento(
        anfitriones[0],
        "San Telmo Suites",
        "Alojamiento 9",
        11000,
        Moneda.PESO_ARG,
        "14:00",
        "10:00",
        direcciones[7],
        5,
        [
          Caracteristica.WIFI,
          Caracteristica.ESTACIONAMIENTO,
          Caracteristica.PISCINA,
        ],
        fotos[8],
      ),
    ),
    new AlojamientoModel(
      new Alojamiento(
        anfitriones[0],
        "Ayres Duplex Suites",
        "Alojamiento 10",
        7000,
        Moneda.PESO_ARG,
        "14:00",
        "10:00",
        direcciones[8],
        5,
        [Caracteristica.WIFI, Caracteristica.ESTACIONAMIENTO],
        fotos[9],
      ),
    ),
    new AlojamientoModel(
      new Alojamiento(
        anfitriones[0],
        "Mine Hotel Boutique",
        "Alojamiento 11",
        9000,
        Moneda.PESO_ARG,
        "14:00",
        "10:00",
        direcciones[0],
        5,
        [
          Caracteristica.WIFI,
          Caracteristica.ESTACIONAMIENTO,
          Caracteristica.PISCINA,
        ],
        fotos[10],
      ),
    ),
    new AlojamientoModel(
      new Alojamiento(
        anfitriones[0],
        "Casa San Jose",
        "Alojamiento 12",
        7000,
        Moneda.PESO_ARG,
        "14:00",
        "10:00",
        direcciones[1],
        5,
        [Caracteristica.WIFI, Caracteristica.ESTACIONAMIENTO],
        fotos[11],
      ),
    ),
    new AlojamientoModel(
      new Alojamiento(
        anfitriones[0],
        "Hilton Puerto Madero",
        "Alojamiento 13",
        7000,
        Moneda.PESO_ARG,
        "14:00",
        "10:00",
        direcciones[2],
        5,
        [Caracteristica.WIFI, Caracteristica.ESTACIONAMIENTO],
        fotos[12],
      ),
    ),
    new AlojamientoModel(
      new Alojamiento(
        anfitriones[0],
        "Hotel Rural Casa Grande",
        "Alojamiento 14",
        7000,
        Moneda.PESO_ARG,
        "14:00",
        "10:00",
        direcciones[3],
        5,
        [Caracteristica.WIFI, Caracteristica.ESTACIONAMIENTO],
        fotos[13],
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
