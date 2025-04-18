// import { Usuario } from "./clases/Usuario";
// import { Reserva, CambioEstadoReserva, RangoFechas } from "./clases/Reserva";
// import { Alojamiento, Foto } from "./clases/Alojamiento";
// import { Direccion, Ciudad, Pais } from "./clases/Direccion";
// import { Notificacion, FactoryNotificacion } from "./clases/Notificacion";
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
