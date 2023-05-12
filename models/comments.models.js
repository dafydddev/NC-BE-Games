const connection = require("../db/connection.js");

exports.selectCommentsReviewById = (review_id) => {
  const commentQuery =
    "SELECT * FROM comments WHERE review_id = $1 ORDER BY created_at DESC;";
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

exports.insertCommentByReviewId = (review_id, username, body) => {
  const commentQuery =
    "INSERT INTO comments (review_id, author, body) VALUES ($1, $2, $3) RETURNING *";
  const values = [review_id, username, body];
  return connection.query(commentQuery, values).then(({ rows }) => {
    return rows[0].body;
  });
};

exports.deleteCommentByCommentId = (comment_id) => {
  const deleteQuery = "DELETE FROM comments WHERE comment_id = $1;";
  const values = [comment_id];
  return connection.query(deleteQuery, values).then(({ rowCount }) => {
    if (rowCount === 0) {
      return Promise.reject({
        status: 404,
        msg: `No comments found for comment_id: ${comment_id}`,
      });
    }
  });
};
