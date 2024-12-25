const sendErrorForDev = (err, res) =>
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message || "Internal Server Error",
    stack: err.stack,
  });
const sendErrorForProd = (err, res) => res.status(err.statusCode).json({
    status: err.status,
    message: err.message || "Internal Server Error",
  });
const globalError = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (process.env.NODE_ENV === "development") {
    sendErrorForDev(err, res);
  } else {
    sendErrorForProd(err, res);
  }
};

module.exports = globalError;
