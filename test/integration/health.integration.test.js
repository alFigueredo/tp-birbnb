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
