import request from "supertest";
import { jest } from "@jest/globals";
import express from "express";
import { TipoUsuario } from "../../back/models/entities/Usuario.js";
import { Server } from "../../back/server/server.js";
import { Moneda } from "../../back/models/entities/Alojamiento.js";
import { ReservaService } from "../../back/services/ReservaService.js";
import { ReservaController } from "../../back/controllers/ReservaController.js";
import { Reserva } from "../../back/models/entities/Reserva.js";
import { AlojamientoService } from "../../back/services/AlojamientoService.js";
import { AlojamientoController } from "../../back/controllers/AlojamientoController.js";

const anfi1 = {
  nombre: "John Doe",
  email: "johndoe@gmail.com",
  tipo: TipoUsuario.ANFITRION,
};

const aloja1 = {
  id: 1,
  nombre: "Alojamiento 1",
  precioPorNoche: 7000,
  moneda: Moneda.PESO_ARG,
  cantHuespedesMax: 5,
  reservas: [
    {
      rangoFechas: {
        fechaInicio: new Date(2025, 7, 1),
        fechaFin: new Date(2025, 7, 3),
      },
      estado: "PENDIENTE",
    },
    {
      rangoFechas: {
        fechaInicio: new Date(2025, 7, 4),
        fechaFin: new Date(2025, 7, 6),
      },
      estado: "PENDIENTE",
    },
    {
      rangoFechas: {
        fechaInicio: new Date(2025, 7, 7),
        fechaFin: new Date(2025, 7, 9),
      },
      estado: "PENDIENTE",
    },
  ],
  estasDisponibleEn: (_rangoFechas) => true,
  puedenAlojarse: (_cantHuespedes) => true,
  agregarReserva: jest.fn(),
};

const aloja2 = {
  id: 2,
  nombre: "Alojamiento 2",
  precioPorNoche: 7000,
  moneda: Moneda.PESO_ARG,
  cantHuespedesMax: 5,
  reservas: [],
  estasDisponibleEn: (_rangoFechas) => true,
  puedenAlojarse: (_cantHuespedes) => true,
  agregarReserva: jest.fn(),
};

const aloja3 = {
  id: 3,
  nombre: "Alojamiento 3",
  precioPorNoche: 7000,
  moneda: Moneda.PESO_ARG,
  cantHuespedesMax: 5,
  reservas: [],
  estasDisponibleEn: (_rangoFechas) => true,
  puedenAlojarse: (_cantHuespedes) => true,
  agregarReserva: jest.fn(),
};

const alojamientoRepository = {
  findAll: jest.fn().mockResolvedValue([aloja1, aloja2, aloja3]),
  findById: jest.fn().mockResolvedValue(aloja1),
};

const app = express();
const server = new Server(app);
server.configureRoutes();
const alojamientoService = new AlojamientoService(alojamientoRepository);
const alojamientoController = new AlojamientoController(alojamientoService);
server.setController(AlojamientoController, alojamientoController);

describe("GET /alojamiento", () => {
  test("Debería retornar alojamientos", async () => {
    const response = await request(app).get("/alojamiento");

    expect(response.status).toBe(200);
    expect(response.type).toBe("application/json");
    expect(response.body.length).toBe(3);
    expect(response.error).toBeFalsy();
  });
});

describe("GET /alojamiento/:id", () => {
  test("Debería retornar alojamientos", async () => {
    const response = await request(app).get("/alojamiento/123");

    expect(response.status).toBe(200);
    expect(response.type).toBe("application/json");
    expect(response.error).toBeFalsy();
  });

  test("Debería retornar un 404", async () => {
    alojamientoRepository.findById.mockResolvedValue(null);

    const response = await request(app).get("/alojamiento/1");

    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
    alojamientoRepository.findById.mockResolvedValue(aloja1);
  });
});
