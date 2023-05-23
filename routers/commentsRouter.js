const commentsRouter = require('express').Router();
const { removeComment } = require('../controllers/comments.controllers');

commentsRouter.route('/:comment_id').delete(removeComment);

module.exports = commentsRouter;
