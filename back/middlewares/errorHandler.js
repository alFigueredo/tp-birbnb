export const errorHandler = (err, _req, res, _next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (["development", "test"].includes(process.env.NODE_ENV)) {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
    // console.error({
    //   status: err.status,
    //   error: err,
    //   message: err.message,
    //   stack: err.stack,
    // });
  } else {
    // Producción
    if (err.isOperational) {
      res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    } else {
      // Error de programación: no enviar detalles al cliente
      console.error("ERROR 💥", err);
      res.status(500).json({
        status: "error",
        message: "Algo salió mal",
      });
    }
  }
};
