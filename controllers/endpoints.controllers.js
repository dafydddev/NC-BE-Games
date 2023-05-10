const fs = require('fs').promises;

exports.readEndpoints = (req, res, next) => {
    fs.readFile(`${__dirname}/../endpoints.json`)
    .then((returnedEndpoints) => {
      const parsedEndpoints = JSON.parse(returnedEndpoints);
      res.status(200).send(parsedEndpoints);
    });
  };