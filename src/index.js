import express from "express";
import "dotenv/config";

const app = express();

app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
  });
});

const port = process.env.SERVER_PORT ?? 3000;
app.listen(port, () => {
  console.log("Server on port " + port);
});
