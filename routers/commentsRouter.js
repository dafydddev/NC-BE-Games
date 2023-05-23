const commentsRouter = require('express').Router();
const { removeComment, patchCommentVotes } = require('../controllers/comments.controllers');

commentsRouter.route('/:comment_id').delete(removeComment);
commentsRouter.route('/:comment_id').patch(patchCommentVotes);

module.exports = commentsRouter;
