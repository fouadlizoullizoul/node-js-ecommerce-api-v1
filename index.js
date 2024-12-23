const express = require("express");
const app = express();
const dotenv = require("dotenv");
const morgan = require("morgan");
const mongoose = require("mongoose");
dotenv.config({ path: "./config.env" });
//databse connection

mongoose
  .connect(process.env.DB_URI)
  .then((conn) => console.log("DB connection successful :",conn.connection.host))
  .catch((err) => console.log("Database Error",err));

app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode ${process.env.NODE_ENV}`);
}

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the application" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("server started on port ", PORT);
});
