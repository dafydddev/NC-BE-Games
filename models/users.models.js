const connection = require("../db/connection.js");

exports.selectUsers = () => {
  const userQuery = "SELECT * FROM users;";
  return connection.query(userQuery).then(({ rows }) => rows);
};

exports.selectUserByUsername = (username) => {
  const userQuery = "SELECT * FROM users WHERE username = $1;";
  return connection.query(userQuery, [username]).then(({ rows }) => { 
    const user = rows[0];
    if (user) {
      return user;
    }
    return Promise.reject({
      status: 404,
      msg: `No user found for username: ${username}`,
    });
  });
};
