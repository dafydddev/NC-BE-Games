const connection = require("../db/connection.js");

exports.selectReviewById = (review_id) => {
  const categoryQuery = "SELECT * FROM reviews WHERE review_id = $1";
  return connection.query(categoryQuery, [review_id]).then(({ rows }) => {
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
