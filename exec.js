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
  DireccionModel,
  PaisModel,
} from "./back/models/schemas/DireccionSchema.js";
import { NotificacionModel } from "./back/models/schemas/NotificacionSchema.js";
import {
  RangoFechasModel,
  ReservaModel,
} from "./back/models/schemas/ReservaSchema.js";
import { UsuarioModel } from "./back/models/schemas/UsuarioSchema.js";

export async function exec() {
  await UsuarioModel.deleteMany();
  await NotificacionModel.deleteMany();
  await RangoFechasModel.deleteMany();
  await FotoModel.deleteMany();
  await PaisModel.deleteMany();
  await CiudadModel.deleteMany();
  await DireccionModel.deleteMany();
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
  const notif2 = new NotificacionModel(new Notificacion("Mensaje 2", usu1));
  const notif3 = new NotificacionModel(new Notificacion("Mensaje 3", usu1));
  const notif4 = new NotificacionModel(new Notificacion("Mensaje 4", usu1));
  const notif5 = new NotificacionModel(new Notificacion("Mensaje 5", usu1));

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

  const rango1 = new RangoFechasModel(
    new RangoFechas(new Date(2025, 5, 1), new Date(2025, 5, 3)),
  );
  const rango2 = new RangoFechasModel(
    new RangoFechas(new Date(2025, 5, 4), new Date(2025, 5, 6)),
  );
  const rango3 = new RangoFechasModel(
    new RangoFechas(new Date(2025, 5, 7), new Date(2025, 5, 9)),
  );
  const rango4 = new RangoFechasModel(
    new RangoFechas(new Date(2025, 5, 10), new Date(2025, 5, 12)),
  );
  const rango5 = new RangoFechasModel(
    new RangoFechas(new Date(2025, 5, 13), new Date(2025, 5, 15)),
  );

  const foto1 = new FotoModel(new Foto("Foto 1", "foto1"));

  const pais1 = new PaisModel(new Pais("Pais 1"));

  const ciudad1 = new CiudadModel(new Ciudad("Ciudad 1", pais1));

  const direc1 = new DireccionModel(
    new Direccion("Calle Falsa", 123, ciudad1, "1", "1"),
  );

  const aloja1 = new AlojamientoModel(
    new Alojamiento(
      anfi1,
      "Alojamiento 1",
      "Alojamiento 1",
      7000,
      Moneda.PESO_ARG,
      "21:00",
      "11:00",
      direc1,
      5,
      [Caracteristica.WIFI],
      [],
      foto1,
    ),
  );

  const reser1 = new ReservaModel(new Reserva(usu1, 3, aloja1, rango1, 7000));
  aloja1.reservas.push(reser1);
  const reser2 = new ReservaModel(new Reserva(usu2, 3, aloja1, rango2, 7000));
  aloja1.reservas.push(reser2);
  const reser3 = new ReservaModel(new Reserva(usu3, 3, aloja1, rango3, 7000));
  aloja1.reservas.push(reser3);
  const reser4 = new ReservaModel(new Reserva(usu2, 3, aloja1, rango4, 7000));
  aloja1.reservas.push(reser4);
  const reser5 = new ReservaModel(new Reserva(usu3, 3, aloja1, rango5, 7000));
  aloja1.reservas.push(reser5);

  await anfi1.save();
  await rango1.save();
  await rango2.save();
  await rango3.save();
  await rango4.save();
  await rango5.save();
  await foto1.save();
  await pais1.save();
  await ciudad1.save();
  await direc1.save();
  await aloja1.save();
  await reser1.save();
  await reser2.save();
  await reser3.save();
  await reser4.save();
  await reser5.save();

  console.log("Database setted");
}
