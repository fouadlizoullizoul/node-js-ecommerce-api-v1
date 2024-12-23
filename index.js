const express = require("express");
const app = express();
const dotenv = require("dotenv");
const morgan = require("morgan");
dotenv.config({ path: "./config.env" });
const dbConnection = require("./config/database");
const categoryRoute = require("./routes/categoryRoute");
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("server started on port ", PORT);
});
