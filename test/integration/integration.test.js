import request from "supertest";
import { app } from "../../back/index.js";

describe("GET /health", () => {
  test("Testeo de healthcheck", async () => {
    const response = await request(app).get("/health");
    expect(response.status).toBe(200);
    expect(response.type).toBe("application/json");
    expect(response.body.status).toBe("ok");
  });
});
