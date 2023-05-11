const connection = require("../db/connection.js");

exports.selectCommentsReviewById = (review_id) => {
  const commentQuery = "SELECT * FROM comments WHERE review_id = $1 ORDER BY created_at DESC;";
  return connection.query(commentQuery, [review_id]).then(({ rows }) => {
    const review = rows[0];
    if (review) {
      return rows;
    }
    return Promise.reject({
      status: 201,
      msg: `No comments found for review_id: ${review_id}`,
    });
  });
};