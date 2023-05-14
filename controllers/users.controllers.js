const { selectUsers, selectUserByUsername } = require("../models/users.models");

exports.getAllUsers = (req, res, next) => {
  selectUsers()
    .then((returnedUsers) => res.status(200).send({users: returnedUsers}))
    .catch(next);
};

exports.getUser = (req, res, next) => {
  const { username } = req.params;
  selectUserByUsername(username)
    .then((returnedUser) => res.status(200).send(returnedUser))
    .catch(next);
};