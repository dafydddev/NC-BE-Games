const { selectUsers } = require("../models/users.models");

exports.getUsers = (req, res, next) => {
  selectUsers()
    .then((returnedUsers) => {
      res.status(200).send({users: returnedUsers});
    })
    .catch(next);
};
