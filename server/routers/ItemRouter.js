const express = require('express');
const ItemRouter = express.Router();
const ItemSchema = require('../models/item.model');
const GeneralSchema = require('../models/general.model');


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
      console.log('get item '+ req.params.id);
    ItemSchema.find({ _id: req.params.id }, function (err, itemD) {
        if (err) {
            console.log('getById 400' + err);
        }
        else {
            console.log('in get item getById' + JSON.stringify(itemD, undefined, 2));
            res.json(itemD);
        }
    });
});
ItemRouter.route('/get/:id').get(function (req, res) {
    //  console.log('get item');
    ItemSchema.find({ name: req.params.name }, function (err, itemD) {
        if (err) {
            console.log('400' + err);
        }
        else {
            console.log('in get item' + JSON.stringify(itemD, undefined, 2));
            res.json(itemD);
        }
    });
});
ItemRouter.route('/get').get(function (req, res) {
    console.log('get item');
    ItemSchema.find(function (err, itemD) {
        if (err) {
            console.log('400' + err);
        }
        else {
            //        console.log('in get item' + JSON.stringify(itemD, undefined, 2));
            res.json(itemD);
        }
    });
});
//todo OrdersColl on the begining
//cityColl on the begining
ItemRouter.route('/add').post(function (req, res) {
    console.log('req.body ' + req.body.categoryId + '-' + req.body.price + '-' + req.body.picturePath + '-' + req.body.name);
    const ItemData = new ItemSchema(req.body);
    console.log('ItemData' +ItemData);
    ItemData.save()
        .then(itemD => {
            confirm.log('itemD' + itemD)
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

//todo del +
//dec generalColl.ordersCounter
//todo check
// GeneralSchema.findOneAndUpdate({}, { $inc: { ordersCounter: -1 } },
//     { new: true }, function (err, response) {
//         if (err) {
//             console.log('GeneralSchema err ' + err);
//         } else {

//             console.log('GeneralSchema dec response  ' + response);
//         }
//     });
module.exports = ItemRouter;