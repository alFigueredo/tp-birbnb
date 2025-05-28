import { AlojamientoController } from "../controllers/AlojamientoController.js";

export function registerAlojamientoRoutes(app, getController) {
  //buscar con filtros
  app.get("/alojamientos", (req, res, next) =>
    getController(AlojamientoController).findAll(req, res, next),
  );

  //buscar por Pagina
  app.get("/alojamientos/page", (req, res, next) =>
    getController(AlojamientoController).findByPage(req, res, next),
  );

  //buscar por ID
  app.get("/alojamientos/:id", (req, res, next) =>
    getController(AlojamientoController).findById(req, res, next),
  );

  //Pruebas para saber si esta conectado
  // app.get("/test", (_req, res) => {
  //   res.json({ mensaje: "todo ok" });
  // });
}

