import express from "express";

export function healthRoutes() {
  const router = express.Router();

  //Endpoint de prueba
  router.get("/health", (_req, res, _next) => {
    res.json({
      status: "ok",
    });
  });

  return router;
}
