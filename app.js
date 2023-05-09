const express = require("express");
const app = express();
const { getCategories } = require("./controllers/categories.controllers");
const { readEndpoints } = require("./controllers/endpoints.controllers");

app.get("/api", readEndpoints);

app.get("/api/categories", getCategories);

app.get("*", (req, res) =>
  res.status(404).send({ message: "Endpoint Not Found" })
);

module.exports = app;
