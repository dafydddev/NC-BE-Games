const {
  selectReviewById,
  selectAllReviews,
  updateReviewVotesById,
} = require("../models/reviews.models");

exports.getAllReviews = (req, res, next) => {
  const {sort_by, order, category} = req.query;
  selectAllReviews(sort_by, order, category)
    .then((returnedReviews) => {
      res.status(200).send(returnedReviews);
    })
    .catch(next);
};

exports.getReview = (req, res, next) => {
  const { review_id } = req.params;
  selectReviewById(review_id)
    .then((returnedReview) => {
      res.status(200).send(returnedReview);
    })
    .catch(next);
};

exports.patchReviewVotes = (req, res, next) => {
  const { review_id } = req.params;
  const { inc_votes } = req.body;
  if (!inc_votes) {
    res.status(400).send({ msg: "inc_votes is required and value must be greater or less than 0" });
  } else {
    updateReviewVotesById(review_id, inc_votes)
      .then((returnedReview) => {
        res.status(200).send(returnedReview);
      })
      .catch(next);
  }
};
