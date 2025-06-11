import {
  Alojamiento,
  Caracteristica,
  Foto,
  Moneda,
} from "./back/models/entities/Alojamiento.js";
import { Ciudad, Direccion, Pais } from "./back/models/entities/Direccion.js";
import { Notificacion } from "./back/models/entities/Notificacion.js";
import { RangoFechas, Reserva } from "./back/models/entities/Reserva.js";
import { TipoUsuario, Usuario } from "./back/models/entities/Usuario.js";
import {
  AlojamientoModel,
  FotoModel,
} from "./back/models/schemas/AlojamientoSchema.js";
import {
  CiudadModel,
  PaisModel,
} from "./back/models/schemas/DireccionSchema.js";
import { NotificacionModel } from "./back/models/schemas/NotificacionSchema.js";
import { ReservaModel } from "./back/models/schemas/ReservaSchema.js";
import { UsuarioModel } from "./back/models/schemas/UsuarioSchema.js";

export async function exec() {
  await UsuarioModel.deleteMany();
  await NotificacionModel.deleteMany();
  await FotoModel.deleteMany();
  await PaisModel.deleteMany();
  await CiudadModel.deleteMany();
  await AlojamientoModel.deleteMany();
  await ReservaModel.deleteMany();

  const usu1 = new UsuarioModel(
    new Usuario("John Doe", "johndoe@gmail.com", TipoUsuario.HUESPED),
  );
  const usu2 = new UsuarioModel(
    new Usuario("Juan Doe", "juandoe@gmail.com", TipoUsuario.HUESPED),
  );
  const usu3 = new UsuarioModel(
    new Usuario("Juana Doe", "juanadoe@gmail.com", TipoUsuario.HUESPED),
  );

  const notif1 = new NotificacionModel(new Notificacion("Mensaje 1", usu1));
  const notif2 = new NotificacionModel(new Notificacion("Mensaje 2", usu2));
  const notif3 = new NotificacionModel(new Notificacion("Mensaje 3", usu3));
  const notif4 = new NotificacionModel(new Notificacion("Mensaje 4", usu2));
  const notif5 = new NotificacionModel(new Notificacion("Mensaje 5", usu3));

  await usu1.save();
  await usu2.save();
  await usu3.save();

  await notif1.save();
  await notif2.save();
  await notif3.save();
  await notif4.save();
  await notif5.save();

  const anfi1 = new UsuarioModel(
    new Usuario("Jane Doe", "janedoe@gmail.com", TipoUsuario.ANFITRION),
  );

  const rango1 = new RangoFechas(new Date(2025, 7, 1), new Date(2025, 7, 3));
  const rango2 = new RangoFechas(new Date(2025, 7, 4), new Date(2025, 7, 6));
  const rango3 = new RangoFechas(new Date(2025, 7, 7), new Date(2025, 7, 9));
  const rango4 = new RangoFechas(new Date(2025, 7, 10), new Date(2025, 7, 12));
  const rango5 = new RangoFechas(new Date(2025, 7, 13), new Date(2025, 7, 15));

  const foto1 = new FotoModel(new Foto("Foto 1", "foto1"));

  const pais1 = new PaisModel(new Pais("Pais 1"));
  const pais2 = new PaisModel(new Pais("Pais 2"));

  const ciudad1 = new CiudadModel(new Ciudad("Ciudad 1", pais1));
  const ciudad2 = new CiudadModel(new Ciudad("Ciudad 2", pais2));

  const direc1 = new Direccion("Calle Falsa", 123, ciudad1, "1", "1");
  const direc2 = new Direccion("Calle Falsa", 123, ciudad2, "2", "2");
  const direc3 = new Direccion("Calle Falsa", 123, ciudad2, "1", "2");

  const aloja1 = new AlojamientoModel(
    new Alojamiento(
      anfi1,
      "Alojamiento 1",
      "Alojamiento 1",
      7000,
      Moneda.PESO_ARG,
      "14:00",
      "10:00",
      direc1,
      5,
      [Caracteristica.WIFI, Caracteristica.ESTACIONAMIENTO],
      foto1,
    ),
  );

  const aloja2 = new AlojamientoModel(
    new Alojamiento(
      anfi1,
      "Alojamiento 2",
      "Alojamiento 2",
      6000,
      Moneda.PESO_ARG,
      "14:00",
      "10:00",
      direc2,
      6,
      [Caracteristica.WIFI, Caracteristica.ESTACIONAMIENTO],
      foto1,
    ),
  );

  const aloja3 = new AlojamientoModel(
    new Alojamiento(
      anfi1,
      "Alojamiento 3",
      "Alojamiento 3",
      8000,
      Moneda.PESO_ARG,
      "14:00",
      "10:00",
      direc3,
      7,
      [
        Caracteristica.WIFI,
        Caracteristica.ESTACIONAMIENTO,
        Caracteristica.PISCINA,
      ],
      foto1,
    ),
  );

  const aloja4 = new AlojamientoModel(
    new Alojamiento(
      anfi1,
      "Alojamiento 4",
      "Alojamiento 4",
      7000,
      Moneda.PESO_ARG,
      "14:00",
      "10:00",
      direc1,
      5,
      [Caracteristica.WIFI, Caracteristica.MASCOTAS_PERMITIDAS],
      foto1,
    ),
  );

  const reser1 = new ReservaModel(new Reserva(usu1, 3, aloja1, rango1, 7000));
  aloja1.agregarReserva(reser1);
  const reser2 = new ReservaModel(new Reserva(usu2, 3, aloja1, rango2, 7000));
  aloja1.agregarReserva(reser2);
  const reser3 = new ReservaModel(new Reserva(usu3, 3, aloja1, rango3, 7000));
  aloja1.agregarReserva(reser3);
  const reser4 = new ReservaModel(new Reserva(usu2, 3, aloja1, rango4, 7000));
  aloja1.agregarReserva(reser4);
  const reser5 = new ReservaModel(new Reserva(usu3, 3, aloja1, rango5, 7000));
  aloja1.agregarReserva(reser5);

  await anfi1.save();
  await foto1.save();
  await pais1.save();
  await pais2.save();
  await ciudad1.save();
  await ciudad2.save();
  await aloja1.save();
  await aloja2.save();
  await aloja3.save();
  await aloja4.save();
  await reser1.save();
  await reser2.save();
  await reser3.save();
  await reser4.save();
  await reser5.save();

  console.log("Database setted");
}
