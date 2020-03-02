const express = require('express');
const ItemRouter = express.Router();
const ItemSchema = require('../models/item.model');
const GeneralSchema = require('../models/general.model');
var fs = require('fs');


ItemRouter.get('/getByCategory/:id', function (req, res) {
    console.log('getting on Member = ' + req.params.id);
    ItemSchema.find({ categoryId: req.params.id }).exec(function (err, itemD) {
        if (err) {
            console.log(err);
            res.send(404, 'Error Occurred!')
        } else {
            console.log('in getByCategory item ' + itemD);
            res.json(itemD);
        }
    });
});

ItemRouter.route('/getById/:id').get(function (req, res) {
    ItemSchema.find({ _id: req.params.id }, function (err, itemD) {
        if (err) {
            res.json(err)
        }
        else {
            res.json(itemD);
        }
    });
});
ItemRouter.route('/get/:id').get(function (req, res) {
    ItemSchema.find({ name: req.params.name }, function (err, itemD) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(itemD);
        }
    });
});
ItemRouter.route('/get').get(function (req, res) {
    ItemSchema.find(function (err, itemD) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(itemD);
        }
    });
});

ItemRouter.route('/add').post(function (req, res) {
    const ItemData = new ItemSchema(req.body);

    ItemData.save()
        .then(itemD => {
            //inc GeneralSchema for count iteams
            GeneralSchema.findOneAndUpdate({},
                { $inc: { itemsCounter: 1 } },
                { new: true }, function (err, response) {
                    if (err) {
                        console.log('itemsCounter err ' + err);
                    } else {
                        console.log('GeneralSchema response  ' + response);
                    }
                });

            res.json('Item added successfully');
        })
        .catch(err => {
            res.status(400).send("unable to save to database" + err);
        });
}
);

// Update item
ItemRouter.route('/update').put(function (req, res) {
    ItemSchema.findOneAndUpdate(
        {
            _id: req.body._id
        },
        {
            $set: {
                name: req.body.name,
                categoryId: req.body.categoryId,
                price: req.body.price,
                picturePath: req.body.picturePath
            }
        },
        {
            upsert: false
        },
        function (err, item) {
            if (err) {
                res.json(err);
            } else {
                res.json('Item - done');
            }
        });
});

module.exports = ItemRouter;