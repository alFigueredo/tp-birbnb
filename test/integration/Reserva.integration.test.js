import request from "supertest";
import { jest } from "@jest/globals";
import express from "express";
import { TipoUsuario } from "../../back/models/entities/Usuario.js";
import { Server } from "../../back/server/server.js";
import { Moneda } from "../../back/models/entities/Alojamiento.js";
import { ReservaService } from "../../back/services/ReservaService.js";
import { ReservaController } from "../../back/controllers/ReservaController.js";
import { Reserva } from "../../back/models/entities/Reserva.js";

const usu1 = {
  nombre: "John Doe",
  email: "johndoe@gmail.com",
  tipo: TipoUsuario.HUESPED,
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
    {
      rangoFechas: {
        fechaInicio: new Date(2025, 7, 10),
        fechaFin: new Date(2025, 7, 12),
      },
      estado: "PENDIENTE",
    },
    {
      rangoFechas: {
        fechaInicio: new Date(2025, 7, 13),
        fechaFin: new Date(2025, 7, 15),
      },
      estado: "PENDIENTE",
    },
  ],
  estasDisponibleEn: (_rangoFechas) => true,
  puedenAlojarse: (_cantHuespedes) => true,
  agregarReserva: jest.fn(),
};

const reservaRepository = {
  findAll: jest.fn().mockResolvedValue([
    {
      id: 1,
      fechaAlta: Date.now(),
      huespedReservador: usu1,
      cantHuespedes: 3,
      alojamiento: aloja1,
      rangoFechas: {
        fechaInicio: new Date(2025, 7, 1),
        fechaFin: new Date(2025, 7, 3),
      },
      estado: "PENDIENTE",
      precioPorNoche: 7000,
    },
    {
      id: 2,
      fechaAlta: Date.now(),
      huespedReservador: usu1,
      cantHuespedes: 3,
      alojamiento: aloja1,
      rangoFechas: {
        fechaInicio: new Date(2025, 7, 4),
        fechaFin: new Date(2025, 7, 6),
      },
      estado: "PENDIENTE",
      precioPorNoche: 7000,
    },
    {
      id: 3,
      fechaAlta: Date.now(),
      huespedReservador: usu1,
      cantHuespedes: 3,
      alojamiento: aloja1,
      rangoFechas: {
        fechaInicio: new Date(2025, 7, 7),
        fechaFin: new Date(2025, 7, 9),
      },
      estado: "PENDIENTE",
      precioPorNoche: 7000,
    },
    {
      id: 4,
      fechaAlta: Date.now(),
      huespedReservador: usu1,
      cantHuespedes: 3,
      alojamiento: aloja1,
      rangoFechas: {
        fechaInicio: new Date(2025, 7, 10),
        fechaFin: new Date(2025, 7, 12),
      },
      estado: "PENDIENTE",
      precioPorNoche: 7000,
    },
    {
      id: 5,
      fechaAlta: Date.now(),
      huespedReservador: usu1,
      cantHuespedes: 3,
      alojamiento: aloja1,
      rangoFechas: {
        fechaInicio: new Date(2025, 7, 13),
        fechaFin: new Date(2025, 7, 15),
      },
      estado: "PENDIENTE",
      precioPorNoche: 7000,
    },
  ]),
  save: jest.fn(),
};

const alojamientoRepository = {
  findById: jest.fn().mockResolvedValue(aloja1),
  save: jest.fn(),
};

const usuarioRepository = {
  findById: jest.fn().mockResolvedValue(usu1),
};

const app = express();
const server = new Server(app);
server.configureRoutes();
const reservaService = new ReservaService(
  reservaRepository,
  usuarioRepository,
  alojamientoRepository,
);
const reservaController = new ReservaController(reservaService);
server.setController(ReservaController, reservaController);

describe("GET /reserva", () => {
  test("Debería retornar reservas", async () => {
    const response = await request(app).get("/reserva");

    expect(response.status).toBe(200);
    expect(response.type).toBe("application/json");
    expect(response.body.length).toBe(5);
    expect(response.error).toBeFalsy();
  });
});

describe("GET /reserva/{:idUsuario}", () => {
  test("Debería retornar reservas", async () => {
    const response = await request(app).get("/reserva/1");

    expect(response.status).toBe(200);
    expect(response.type).toBe("application/json");
    expect(response.body.length).toBe(5);
    expect(response.error).toBeFalsy();
  });
});

describe("POST /reserva", () => {
  const reserva = {
    id: 6,
    fechaAlta: Date.now(),
    huespedReservador: usu1,
    cantHuespedes: 3,
    alojamiento: aloja1,
    rangoFechas: {
      fechaInicio: new Date(2025, 7, 16),
      fechaFin: new Date(2025, 7, 18),
    },
    estado: "PENDIENTE",
    precioPorNoche: 7000,
  };
  test("Debería realizar una reserva", async () => {
    const response = await request(app).post("/reserva").send(reserva);

    expect(response.status).toBe(201);
    expect(reservaRepository.save).toHaveBeenCalledWith(expect.any(Reserva));
    expect(response.error).toBeFalsy();
  });

  test("Horario no disponible, debería lanzar un 409", async () => {
    aloja1.estasDisponibleEn = (_rangoFechas) => false;
    const response = await request(app).post("/reserva").send(reserva);

    expect(response.status).toBe(409);
    expect(response.error).toBeTruthy();
  });

  test("Cantidad de huéspedes no permitida, debería lanzar un 409", async () => {
    aloja1.estasDisponibleEn = (_rangoFechas) => true;
    aloja1.puedenAlojarse = (_cantHuespedes) => false;
    const response = await request(app).post("/reserva").send(reserva);

    expect(response.status).toBe(409);
    expect(response.error).toBeTruthy();
    aloja1.puedenAlojarse = (_cantHuespedes) => true;
  });
});
