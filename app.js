const express = require("express");
const app = express();
const { getCategories } = require("./controllers/categories.controllers");
const { getReview } = require("./controllers/reviews.controllers");

app.get("/api", (req, res) => res.status(200).send({ message: "All Ok" }));

app.get("/api/categories", getCategories);
app.get("/api/reviews/:review_id", getReview);

app.get("*", (req, res) =>
  res.status(404).send({ message: "Endpoint Not Found" })
);

app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  }
  else if (err.code === '22P02') {
    res.status(400).send({ msg: 'Bad Request' });
  }
  else {
    res.status(500).send({ msg: 'Internal Server Error' });
  }
});

module.exports = app;
