const endpoints = require('../endpoints.json');

exports.readEndpoints = (req, res, next) => {
  res.status(200).send(endpoints);
};