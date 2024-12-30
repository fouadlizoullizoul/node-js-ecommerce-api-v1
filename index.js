const express = require("express");

const app = express();
const dotenv = require("dotenv");
const morgan = require("morgan");

dotenv.config({ path: "./config.env" });
const globalError = require("./middlewares/errorMiddleware");
const dbConnection = require("./config/database");
//Route
const categoryRoute = require("./routes/categoryRoute");
const subCategoryRoute = require("./routes/subCategoryRoute");
const brandsRoute = require("./routes/brandRoute");
const productRoute = require("./routes/productRoute");
const ApiError = require("./utils/ApiError");

//db connection
dbConnection();

//Middleware
app.use(express.json());

//middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode ${process.env.NODE_ENV}`);
}

// Mount Routes
app.use("/api/v1/categories", categoryRoute);
app.use("/api/v1/subcategories", subCategoryRoute);
app.use("/api/v1/brands", brandsRoute);
app.use("/api/v1/products", productRoute);
app.all("*", (req, res, next) => {
  next(new ApiError(400, `Can't find ${req.originalUrl} on this server!`));
});

//Global error handling middleware
app.use(globalError);

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log("server started on port ", PORT);
});
//Handle unhandled promise rejections outside express
process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION :", err.name, err.message);
  server.close(() => {
    console.log("Server is closing down..."); // close the server
    process.exit(1); // exit the process with an error code
  });
});
