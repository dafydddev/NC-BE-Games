const reviewsRouter = require('express').Router();
const {
  getReview,
  getAllReviews,
  patchReviewVotes,
} = require('../controllers/reviews.controllers');
const {
  getCommentById,
  postCommentById,
} = require('../controllers/comments.controllers');

reviewsRouter.route('/').get(getAllReviews);
reviewsRouter.route('/:review_id').get(getReview).patch(patchReviewVotes);
reviewsRouter.route('/:review_id/comments').get(getCommentById).post(postCommentById);

module.exports = reviewsRouter;
