const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");

mongoose
  .connect("mongodb://localhost:27017/ShapeDiver", {
    useNewUrlParser: true,
  })

  .then((res) => console.log("Connected to MongoDb"))
  .catch((err) => console.log("MongoDb connection Error", err));

app.use("/uploads", express.static("uploads"));
app.use(morgan("dev"));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

console.log("ok2");

const rolesRoute = require("./api/routes/roles");
const authRoute = require("./api/routes/auth");
const payment = require("./api/routes/payment");
const contactUs = require("./api/routes/contactUs");
const admin = require("./api/routes/Admin");
const model = require("./api/routes/model");

app.use("/roles", rolesRoute);
app.use("/auth", authRoute);
app.use("/payment", payment);
app.use("/contactUs", contactUs);
app.use("/admin", admin);
app.use("/model", model);

app.use("/hello", (req, res, next) => {
  console.log("ok");
  res.status(200).json({
    message: "hello world",
  });
});

module.exports = app;
