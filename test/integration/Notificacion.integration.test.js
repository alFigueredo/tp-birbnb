import request from "supertest";
import { jest } from "@jest/globals";
import express from "express";
import { TipoUsuario } from "../../back/models/entities/Usuario.js";
import { Notificacion } from "../../back/models/entities/Notificacion.js";
import { NotificacionService } from "../../back/services/NotificacionService.js";
import { NotificacionController } from "../../back/controllers/NotificacionController.js";
import { Server } from "../../back/server/server.js";

const usu1 = {
  nombre: "John Doe",
  email: "johndoe@gmail.com",
  tipo: TipoUsuario.HUESPED,
};

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
  findById: jest.fn().mockResolvedValue(new Notificacion("Notificacion", usu1)),
  save: jest.fn(),
};

const app = express();
const server = new Server(app);
server.configureRoutes();
const notificacionService = new NotificacionService(notificacionRepository);
const notificacionController = new NotificacionController(notificacionService);
server.setController(NotificacionController, notificacionController);

describe("GET /notificacion", () => {
  test("Debería retornar notificaciones sin leer", async () => {
    const response = await request(app).get("/notificacion/sinleer");

    expect(response.status).toBe(200);
    expect(response.type).toBe("application/json");
    expect(response.body.length).toBe(3);
    expect(response.error).toBeFalsy();
  });

  test("Debería retornar notificaciones leidas", async () => {
    const response = await request(app).get("/notificacion/leida");

    expect(response.status).toBe(200);
    expect(response.type).toBe("application/json");
    expect(response.body.length).toBe(3);
    expect(response.error).toBeFalsy();
  });

  test("Debería retornar un error 400", async () => {
    const response = await request(app).get("/notificacion/leidas");

    expect(response.status).toBe(400);
    expect(response.error).toBeTruthy();
  });
});

describe("PUT /notificacion/leida", () => {
  test("Debería actualizar el estado de la notificación", async () => {
    const response = await request(app).put("/notificacion/leida/1");

    expect(response.status).toBe(200);
    expect(notificacionRepository.save).toHaveBeenCalled();
    expect(notificacionRepository.save).toHaveBeenCalledWith(
      expect.any(Notificacion),
    );
    expect(response.error).toBeFalsy();
  });

  test("Debería retornar un 404", async () => {
    notificacionRepository.findById.mockResolvedValue(null);

    const response = await request(app).put("/notificacion/leida/1");

    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });
});
