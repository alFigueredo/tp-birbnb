// import { Usuario } from "./clases/Usuario.js";
// import { Reserva, CambioEstadoReserva, RangoFechas } from "./clases/Reserva.js";
// import { Alojamiento } from "./clases/Alojamiento.js";
// import { Alojamiento, Foto } from "./clases/Alojamiento.js";
// import { Direccion, Ciudad, Pais } from "./clases/Direccion.js";
// import { Notificacion, FactoryNotificacion } from "./clases/Notificacion.js";
// import {
//   TipoUsuario,
//   Moneda,
//   Caracteristica,
//   EstadoReserva,
// } from "./enumeraciones.js";
import express from "express";
import "dotenv/config";

const app = express();

app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
  });
});

const port = process.env.SERVER_PORT ?? 3000;
app.listen(port, () => {
  console.log("Server on port " + port);
});
