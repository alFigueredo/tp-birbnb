import request from "supertest";
import { jest } from "@jest/globals";
import express from "express";
import { TipoUsuario } from "../../models/entities/Usuario.js";
import { Notificacion } from "../../models/entities/Notificacion.js";
import { NotificacionService } from "../../services/NotificacionService.js";
import { NotificacionController } from "../../controllers/NotificacionController.js";
import { Server } from "../../server/server.js";

const usu1 = {
  nombre: "John Doe",
  email: "johndoe@gmail.com",
  tipo: TipoUsuario.HUESPED,
};

const notif1 = new Notificacion("Notificacion", usu1);

const notificacionRepository = {
  findAll: jest.fn().mockResolvedValue([
    {
      id: 1,
      nombre: "Notificacion 1",
      usuario: usu1,
      fechaAlta: Date.now(),
    },
    {
      id: 2,
      nombre: "Notificacion 2",
      usuario: usu1,
      fechaAlta: Date.now(),
    },
    {
      id: 3,
      nombre: "Notificacion 3",
      usuario: usu1,
      fechaAlta: Date.now(),
    },
  ]),
  findById: jest.fn().mockResolvedValue(notif1),
  save: jest.fn(),
};

const usuarioRepository = {
  findById: jest.fn().mockResolvedValue(usu1),
};

const app = express();
const server = new Server(app);
server.configureRoutes();
const notificacionService = new NotificacionService(
  notificacionRepository,
  usuarioRepository,
);
const notificacionController = new NotificacionController(notificacionService);
server.setController(NotificacionController, notificacionController);

describe("GET /notificacion", () => {
  test("Debería retornar todas las notificaciones", async () => {
    const response = await request(app).get("/notificacion");

    expect(response.status).toBe(200);
    expect(response.type).toBe("application/json");
    expect(response.body.length).toBe(3);
    expect(response.error).toBeFalsy();
  });

  test("Debería retornar todas las notificaciones de un usuario", async () => {
    const response = await request(app).get("/usuario/123/notificacion");

    expect(response.status).toBe(200);
    expect(response.type).toBe("application/json");
    expect(response.body.length).toBe(3);
    expect(response.error).toBeFalsy();
  });

  test("Debería retornar notificaciones sin leer de un usuario", async () => {
    const response = await request(app).get(
      "/usuario/123/notificacion/sinleer",
    );

    expect(response.status).toBe(200);
    expect(response.type).toBe("application/json");
    expect(response.body.length).toBe(3);
    expect(response.error).toBeFalsy();
  });

  test("Debería retornar notificaciones leidas de un usuario", async () => {
    const response = await request(app).get("/usuario/123/notificacion/leida");

    expect(response.status).toBe(200);
    expect(response.type).toBe("application/json");
    expect(response.body.length).toBe(3);
    expect(response.error).toBeFalsy();
  });

  test("Debería retornar un error 400", async () => {
    const response = await request(app).get("/usuario/123/notificacion/leidas");

    expect(response.status).toBe(400);
    expect(response.error).toBeTruthy();
  });

  test("Debería retornar un error 404", async () => {
    usuarioRepository.findById.mockResolvedValue(null);
    const response = await request(app).get("/usuario/123/notificacion/leida");

    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
    usuarioRepository.findById.mockResolvedValue(usu1);
  });
});

describe("PUT /notificacion/:id/leer", () => {
  test("Debería actualizar el estado de la notificación", async () => {
    const response = await request(app).put("/notificacion/1/leer");

    expect(response.status).toBe(200);
    expect(notificacionRepository.save).toHaveBeenCalled();
    expect(notificacionRepository.save).toHaveBeenCalledWith(
      expect.any(Notificacion),
    );
    expect(response.error).toBeFalsy();
  });

  test("Debería retornar un 404", async () => {
    notificacionRepository.findById.mockResolvedValue(null);

    const response = await request(app).put("/notificacion/1/leer");

    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });

  test("Debería retornar un 409", async () => {
    notif1.leida = true;
    notificacionRepository.findById.mockResolvedValue(notif1);

    const response = await request(app).put("/notificacion/1/leer");

    expect(response.status).toBe(409);
    expect(response.error).toBeTruthy();
    notif1.leida = false;
  });
});
