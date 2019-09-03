const express = require('express');
const CategoryRouter = express.Router();
const CategorySchema = require('../models/category.model');


CategoryRouter.route('/get').get(function (req, res) {
  console.log('get Category');
  CategorySchema.find(function (err, categoryD) {
    if (err) {
      console.log('400' + err);
    }
    else {
      console.log('in get Category' + JSON.stringify(categoryD, undefined, 2));
      res.json(categoryD);
    }
  });
});

CategoryRouter.route('/get/:id').get(function (req, res) {
  console.log('get Category id');
  CategorySchema.find({ name: req.params.name }, function (err, categoryD) {
    if (err) {
      console.log('400' + err);
    }
    else {
      console.log('in get Category id' + JSON.stringify(categoryD, undefined, 2));
      res.json(categoryD);
    }
  });
});



CategoryRouter.route('/add').post(function (req, res) {
  console.log('req.name ' + req.params.name);
  const categoryData = new CategorySchema(req.body);

  CategorySchema.find({ name: req.body.name }, function (err, docs) {
    if (docs.length) {
      res.status(499).send("Category already exists");
    } else {
      categoryData.save()
        .then(categoryD => {
          res.json('Category added successfully');
        })
        .catch(err => {
          res.status(400).send("unable to save to database");
        });
    }
  });
});

module.exports = CategoryRouter;