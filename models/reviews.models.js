const connection = require("../db/connection.js");

exports.selectAllReviews = (sort_by, order, category) => {
  let reviewQuery =
    "SELECT reviews.owner, reviews.title, reviews.review_id, reviews.category, reviews.review_img_url, reviews.created_at, reviews.votes, reviews.designer, COUNT(comments.comment_id)::INTEGER AS comment_count FROM reviews LEFT JOIN comments ON reviews.review_id = comments.review_id";
  const queryValues = [];
  if (category !== undefined) {
    reviewQuery += " WHERE category = $1";
    queryValues.push(category);
  }
  reviewQuery += " GROUP BY reviews.owner, reviews.title, reviews.review_id, reviews.category, reviews.review_img_url, reviews.created_at, reviews.votes, reviews.designer";
  if (sort_by === undefined) {
    reviewQuery += " ORDER BY created_at";
  } else {
    const validSorts = [
      "owner",
      "title",
      "review_id",
      "category",
      "review_img_url",
      "created_at",
      "votes",
      "designer",
      "comment_count",
    ];
    const queryIndex = validSorts.indexOf(sort_by);
    if (queryIndex !== -1) {
      reviewQuery += ` ORDER BY ${validSorts[queryIndex]}`;
    } else {
      return Promise.reject({ status: 400, msg: "Invalid sort query" });
    }
  }
  if (order === undefined) {
    reviewQuery += " desc;";
  } else {
    const validOrders = [`asc`, `desc`];
    const queryIndex = validOrders.indexOf(order);
    if (queryIndex !== -1) {
      reviewQuery += ` ${validOrders[queryIndex]};`;
    } else {
      return Promise.reject({ status: 400, msg: "Invalid order query" });
    }
  }
  return connection.query(reviewQuery, queryValues).then(({ rows }) => {
    const review = rows[0];
    if (review) {
      return rows;
    }
    return Promise.reject({
      status: 404,
      msg: `No games found in ${category} category`
    });
  });
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
