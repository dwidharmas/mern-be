const express = require("express");
const bodyParser = require("body-parser");

const placesRoutes = require("./routes/places-routes");
const usersRoutes = require("./routes/users-routes");
const HttpError = require("./models/http-error");
const mongoose = require("mongoose");
const { MONGO_USER, MONGO_PASSWORD } = require("./util/api-key");

const app = express();

app.use(bodyParser.json());

app.use("/api/places", placesRoutes);
app.use("/api/users", usersRoutes);

app.use((req, res, next) => {
  const errpr = new HttpError("Could not find this route", 404);
  throw errpr;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }

  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occured" });
});

mongoose
  .connect(
    `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0.ac7m6ol.mongodb.net/places?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => {
    app.listen(8000);
  })
  .catch((err) => {
    console.log("err ", err, MONGO_USER, MONGO_PASSWORD);
  });
