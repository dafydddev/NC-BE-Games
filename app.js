const express = require("express");
const app = express();
const { getCategories } = require("./controllers/categories.controllers");
const { getReview, getAllReviews } = require("./controllers/reviews.controllers");
const { readEndpoints } = require("./controllers/endpoints.controllers");
const { getCommentById, postCommentById, removeComment } = require("./controllers/comments.controllers");
const { handleCustomErrors, handlePsqlErrors, handleServerErrors } = require("./errors");

app.use(express.json());

app.get("/api", readEndpoints);
app.get("/api/categories", getCategories);

app.get("/api/reviews", getAllReviews);
app.get("/api/reviews/:review_id", getReview);
app.get("/api/reviews/:review_id/comments", getCommentById);
app.post("/api/reviews/:review_id/comments", postCommentById);

app.delete("/api/comments/:comment_id", removeComment);

app.get("*", (req, res) =>
  res.status(404).send({ message: "Endpoint Not Found" })
);

app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handleServerErrors);

module.exports = app;