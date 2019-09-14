const express = require('express');
const CityRouter = express.Router();
const CitySchema = require('../models/city.model');

CityRouter.route('/get').get(function (req, res) {
  console.log('get city');
  CitySchema.find(function (err, cityD) {
    if (err) {
      console.log('400' + err);
    }
    else {
     // console.log('in get city' + JSON.stringify(cityD, undefined, 2));
      res.json(cityD);
    }
  });
});

CityRouter.route('/get/:id').get(function (req, res) {
  console.log('get city id');
  CitySchema.find({name:req.params.name},function (err, cityD) {
    if (err) {
      console.log('400' + err);
    }
    else {
      console.log('in get city id' + JSON.stringify(cityD, undefined, 2));
      res.json(cityD);
    }
  });
});



CityRouter.route('/add').post(function (req, res) {
  console.log('req.name '+req.params.name);
  const cityData = new CitySchema(req.body);

  CitySchema.find({ name: req.body.name }, function (err, docs) {
    if (docs.length) {
      res.status(499).send("City already exists");
    } else {
      cityData.save()
        .then(cityD => {
          res.json('City added successfully');
        })
        .catch(err => {
          res.status(400).send("unable to save to database");
        });
    }
  });
});

module.exports = CityRouter;