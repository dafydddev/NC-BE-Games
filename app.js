const express = require("express");
const app = express();
const { getCategories } = require("./controllers/categories.controllers");
const { readEndpoints } = require("./controllers/endpoints.controllers");
const { getUsers } = require("./controllers/users.controllers");

app.get("/api", readEndpoints);

app.get("/api/categories", getCategories);

app.get("/api/users", getUsers);

app.get("*", (req, res) =>
  res.status(404).send({ message: "Endpoint Not Found" })
);

module.exports = app;
