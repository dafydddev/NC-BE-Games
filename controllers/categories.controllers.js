const { selectCategories } = require("../models/categories.models");

exports.getCategories = (req, res, next) => {
  selectCategories()
    .then((returnedCategories) => res.status(200).send(returnedCategories))
    .catch(next);
};
