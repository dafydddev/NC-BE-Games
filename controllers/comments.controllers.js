const { selectCommentsReviewById } = require("../models/comments.models");

exports.getCommentById = (req, res, next) => {
    const { review_id } = req.params;
    selectCommentsReviewById(review_id)
    .then((returnedComments) => {
        res.status(200).send(returnedComments);
    })
    .catch(next);
};