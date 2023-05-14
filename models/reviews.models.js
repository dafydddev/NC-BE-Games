const connection = require("../db/connection.js");

exports.selectAllReviews = (sortBy, order, category) => {
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
  const validOrders = ["asc", "desc"];
  let reviewQuery = `
    SELECT 
      reviews.owner, 
      reviews.title, 
      reviews.review_id, 
      reviews.category, 
      reviews.review_img_url, 
      reviews.created_at, 
      reviews.votes, 
      reviews.designer, 
      COUNT(comments.comment_id)::INTEGER AS comment_count 
    FROM reviews 
    LEFT JOIN comments ON reviews.review_id = comments.review_id
  `;
  const queryValues = [];
  if (category) {
    reviewQuery += " WHERE category = $1";
    queryValues.push(category);
  }
  reviewQuery += `
    GROUP BY 
      reviews.owner, 
      reviews.title, 
      reviews.review_id, 
      reviews.category, 
      reviews.review_img_url, 
      reviews.created_at, 
      reviews.votes, 
      reviews.designer
  `;
  if (sortBy) {
    const queryIndex = validSorts.indexOf(sortBy);
    if (queryIndex !== -1) {
      reviewQuery += ` ORDER BY ${validSorts[queryIndex]}`;
    } else {
      return Promise.reject({ status: 400, msg: "Invalid sort query" });
    }
  } else {
    reviewQuery += " ORDER BY created_at";
  }
  if (order) {
    const queryIndex = validOrders.indexOf(order);
    if (queryIndex !== -1) {
      reviewQuery += ` ${validOrders[queryIndex]};`;
    } else {
      return Promise.reject({ status: 400, msg: "Invalid order query" });
    }
  } else {
    reviewQuery += " desc;";
  }
  return connection.query(reviewQuery, queryValues).then(({ rows }) => rows);
};

exports.validateCategory = (category) => {
  return connection
    .query("SELECT * FROM categories WHERE slug = $1;", [category])
    .then(({ rows }) => {
      if (rows.length > 0) {
        Promise.resolve();
      } else {
        return Promise.reject({ status: 400, msg: "Invalid category query" });
      }
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
