import request from "supertest";
import { Server } from "../../back/server/server.js";
import express from "express";

const app = express();
const server = new Server(app);
server.configureRoutes();

describe("GET /health", () => {
  test("Testeo de healthcheck", async () => {
    const response = await request(app).get("/health");
    expect(response.status).toBe(200);
    expect(response.type).toBe("application/json");
    expect(response.body.status).toBe("ok");
  });
});

describe("GET /api-docs", () => {
  test("Testeo de api-docs", async () => {
    const response = await request(app).get("/api-docs");
    // Código 301 indica que el recurso requerido se ha movido permanentemente
    expect(response.status).toBe(301);
    expect(response.type).toBe("text/html");
  });
});
