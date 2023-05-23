const express = require("express");
const app = express();

const reviewsRouter = require('./routers/reviewsRouter');
const commentsRouter = require('./routers/commentsRouter');
const usersRouter = require('./routers/usersRouter');
const categoriesRouter = require('./routers/categoriesRouter');
const { readEndpoints } = require("./controllers/endpoints.controllers");

const {
  handleCustomErrors,
  handlePsqlErrors,
  handleServerErrors,
 } = require("./errors");

app.use(express.json());

app.get("/api", readEndpoints);
app.use('/api/categories', categoriesRouter);
app.use('/api/reviews', reviewsRouter);
app.use('/api/comments', commentsRouter);
app.use('/api/users', usersRouter);

app.get("*", (req, res) =>
  res.status(404).send({ message: "Endpoint Not Found" })
);

app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handleServerErrors);

module.exports = app;
