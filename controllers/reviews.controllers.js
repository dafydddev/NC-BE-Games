const { selectReviewById } = require("../models/reviews.models")

exports.getReview = (req, res, next) => {
    const { review_id } = req.params;
    selectReviewById(review_id)
    .then((returnedReview) => {
        res.status(200).send(returnedReview);
    })
    .catch(next);
};