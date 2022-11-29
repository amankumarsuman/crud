const express = require("express");
var app = express();

const cors = require("cors");
const bodyParser = require("body-parser");

const dataRoutes = require("./api/routes/data");
const tableRoutes = require("./api/routes/tableData");

const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://crud:crud@cluster0.ycw4yzf.mongodb.net/crud?retryWrites=true&w=majority"
);

app.use(bodyParser.urlencoded({ extended: false }));
//extract json data
app.use(bodyParser.json());
app.use(cors());
//routes which can handle request

app.use("/data", dataRoutes);
app.use("/table", tableRoutes);

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error?.message,
    },
  });
});

module.exports = app;
