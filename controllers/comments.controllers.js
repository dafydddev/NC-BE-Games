const {
  selectCommentsReviewById,
  insertCommentByReviewId,
} = require("../models/comments.models");

exports.getCommentById = (req, res, next) => {
  const { review_id } = req.params;
  selectCommentsReviewById(review_id)
    .then((returnedComments) => {
      res.status(200).send(returnedComments);
    })
    .catch(next);
};

exports.postCommentById = (req, res, next) => {
  const { review_id } = req.params;
  const { username, body } = req.body;
  if (!username || !body) {
    res
      .status(400)
      .send({ msg: "username and body are required" });
  } else {
    insertCommentByReviewId(review_id, username, body)
      .then((returnedComment) => {
        res.status(201).send({ body: returnedComment });
      })
      .catch(next);
  }
};