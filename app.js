const express = require("express");
const app = express();
const { getCategories } = require("./controllers/categories.controllers");
const { getReview, getAllReviews, patchReviewVotes } = require("./controllers/reviews.controllers");
const { readEndpoints } = require("./controllers/endpoints.controllers");
const { getCommentById } = require("./controllers/comments.controllers");

app.use(express.json());

app.get("/api", readEndpoints);

app.get("/api/categories", getCategories);

app.get("/api/reviews", getAllReviews);
app.get("/api/reviews/:review_id", getReview);
app.patch("/api/reviews/:review_id", patchReviewVotes);

app.get("/api/reviews/:review_id/comments", getCommentById);


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
    console.log(err);
    res.status(500).send({ msg: 'Internal Server Error' });
  }
});

module.exports = app;