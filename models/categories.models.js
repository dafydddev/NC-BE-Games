const connection = require("../db/connection.js");

exports.selectCategories = () => {
  const categoryQuery = "SELECT * FROM categories;";
  return connection.query(categoryQuery).then(({ rows }) => rows);
};
