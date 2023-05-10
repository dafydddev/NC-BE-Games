const { selectReviewById, selectAllReviews } = require("../models/reviews.models")

exports.getAllReviews = (req, res, next) => {
    selectAllReviews()
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