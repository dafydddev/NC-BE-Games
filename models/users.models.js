const connection = require("../db/connection.js");

exports.selectUsers = () => {
  const userQuery = "SELECT * FROM users;";
  return connection.query(userQuery).then(({ rows }) => rows);
};
