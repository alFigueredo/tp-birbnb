import { Notificacion } from "./back/models/entities/Notificacion.js";
import { TipoUsuario, Usuario } from "./back/models/entities/Usuario.js";
import { NotificacionModel } from "./back/models/schemas/NotificacionSchema.js";
import { UsuarioModel } from "./back/models/schemas/UsuarioSchema.js";

export async function exec() {
  await UsuarioModel.deleteMany();
  await NotificacionModel.deleteMany();

  const usu1 = new UsuarioModel(
    new Usuario("John Doe", "johndoe@gmail.com", TipoUsuario.HUESPED),
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

  console.log("Database setted");
}
