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
  await ReservaModel.deleteMany();
  await AlojamientoModel.deleteMany();
  await RangoFechasModel.deleteMany();

  const usu1 = new UsuarioModel(
    new Usuario("John Doe", "johndoe@gmail.com", TipoUsuario.HUESPED)
  );

  const notif1 = new NotificacionModel(new Notificacion("Mensaje 1", usu1));
  const notif2 = new NotificacionModel(new Notificacion("Mensaje 2", usu1));
  const notif3 = new NotificacionModel(new Notificacion("Mensaje 3", usu1));
  const notif4 = new NotificacionModel(new Notificacion("Mensaje 4", usu1));
  const notif5 = new NotificacionModel(new Notificacion("Mensaje 5", usu1));

  await usu1.save();

  await notif1.save();
  await notif2.save();
  await notif3.save();
  await notif4.save();
  await notif5.save();

  const anfi1 = new UsuarioModel(
    new Usuario("Jane Doe", "janedoe@gmail.com", TipoUsuario.ANFITRION)
  );

  const rango1 = new RangoFechasModel(
    new RangoFechas(new Date(2025, 5, 1), new Date(2025, 5, 5))
  );

  const foto1 = new FotoModel(new Foto("Foto 1", "foto1"));

  const pais1 = new PaisModel(new Pais("Pais 1"));

  const ciudad1 = new CiudadModel(new Ciudad("Ciudad 1", pais1));

  const direc1 = new DireccionModel(
    new Direccion("Calle Falsa", 123, ciudad1, "1", "1")
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
      "",
      5,
      [Caracteristica.WIFI],
      [],
      ""
    )
  );

  const reser1 = new ReservaModel(new Reserva(usu1, 3, aloja1, rango1, 7000));

  await anfi1.save();
  await rango1.save();
  await foto1.save();
  await pais1.save();
  await ciudad1.save();
  await direc1.save();
  await aloja1.save();
  await reser1.save();

  console.log("Database setted");
}
