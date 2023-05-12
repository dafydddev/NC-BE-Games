const connection = require("../db/connection.js");

exports.selectAllReviews = () => {
  const reviewQuery =
    "SELECT reviews.owner, reviews.title, reviews.review_id, reviews.category, reviews.review_img_url, reviews.created_at, reviews.votes, reviews.designer, COUNT(comments.comment_id)::INTEGER AS comment_count FROM reviews LEFT JOIN comments ON reviews.review_id = comments.review_id GROUP BY reviews.owner, reviews.title, reviews.review_id, reviews.category, reviews.review_img_url, reviews.created_at, reviews.votes, reviews.designer ORDER BY reviews.created_at DESC;";
  return connection.query(reviewQuery).then(({ rows }) => rows);
};

exports.selectReviewById = (review_id) => {
  const reviewQuery = "SELECT * FROM reviews WHERE review_id = $1";
  return connection.query(reviewQuery, [review_id]).then(({ rows }) => {
    const review = rows[0];
    if (review) {
      return review;
    }
    return Promise.reject({
      status: 404,
      msg: `No review found for review_id: ${review_id}`,
    });
  });
};

exports.updateReviewVotesById = (review_id, inc_votes) => {
  const reviewQuery =
    "UPDATE reviews SET votes = votes + $1 WHERE review_id = $2 RETURNING *;";
  return connection
    .query(reviewQuery, [inc_votes, review_id])
    .then(({ rows }) => {
      const review = rows[0];
      if (review) {
        return review;
      }
      return Promise.reject({
        status: 404,
        msg: `No review found for review_id: ${review_id}`,
      });
    });
};
