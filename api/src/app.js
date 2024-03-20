const cors = require('cors')
const express = require("express");
const jsonParser = require("body-parser").json;
const mongoose = require("mongoose");
const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')

const courses = require("./routes/courses");
const users = require("./routes/users");

const DB_URL = process.env.ME_CONFIG_MONGODB_URL;
const PORT = process.env.PORT || 3000;

const app = express();
app.use(jsonParser());
app.use(cors())


mongoose.connect(DB_URL);
const db = mongoose.connection;

db.on("error", function (err) {
  console.error("connection error", err);
});

db.on("connected", function () {
  console.log("MongoDB: successfully connected");
});

db.on("disconnected", function () {
  console.log("MongoDB: disconnected");
});

app.get("/", (req, res) => res.send("Hello, World!"))

app.use("/api/v1/courses", courses);
app.use("/api/v1/users", users);


const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "LogRocket Express API with Swagger",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "LogRocket",
        url: "https://logrocket.com",
        email: "info@email.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options)
app.use(
  '/api-docs',
  swaggerUI.serve,
  swaggerUI.setup(specs, { explorer: true })
)

app.listen(PORT, function () {
  console.log(`Project is running on http://localhost:${PORT}`);
});
