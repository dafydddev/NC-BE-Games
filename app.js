const express = require("express");
const app = express();
const { getCategories } = require("./controllers/categories.controllers");

app.get("/api", (req, res) => res.status(200).send({ message: "All Ok" }));

app.get('/api/categories', getCategories);

app.get('*', (req, res) => res.status(404).send({ message: 'Endpoint Not Found' }));

module.exports = app;