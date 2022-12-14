const swaggerUi = require("swagger-ui-express");

const swaggerFile = require("../swagger/swagger_output.json");

require("dotenv-safe").config();

const express = require("express");

const cors = require("cors");

const mongoose = require("./database/dbConnect");

const petsRoutes = require("./routes/petsRoute");

const ownersRoutes = require("./routes/ownersRoute");

const index = require("./routes/index");

const app = express();

app.use(express.json());
app.use(cors());
mongoose.connect();

app.use("/", index);
app.use("/specialpets/pets", petsRoutes);
app.use("/specialpets/owners", ownersRoutes);
app.use(
  "/special-pets-documentation",
  swaggerUi.serve,
  swaggerUi.setup(swaggerFile)
);

module.exports = app;
