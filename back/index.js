import express from "express";
import "dotenv/config";

export const app = express();

app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
  });
});
/*
app.get
app.post
app.put
app.delete
"/api/reservas"
"/api/alojamientos?ubicacion="
"/api/notificaciones/sinleer"
"/api/notificaciones/leido"
*/

const port = process.env.SERVER_PORT ?? 3000;
app.listen(port, () => {
  console.log("Server on port " + port);
});
