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
    console.log('get item ' + req.params.id);
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

// Update document
ItemRouter.route('/update').put(function (req, res) {
    console.log('item-update ');
    console.log('item-update '+req.body._id);
    ItemSchema.findOneAndUpdate(
        {
            _id: req.body._id // [query]
        },
        {
            $set: {
                name: req.body.name,
                categoryId:req.body.categoryId,
                price:req.body.price,
                picturePath:req.body.picturePath
            }
         },
         {
             upsert: false      // [options] if this document has no title create one
         },
         function(err,item) {
             if (err) { console.log('item error occured');
             } else {
                 console.log('Item - Done');
                 res.json('Item - done');
             } 
         });
 });

module.exports = ItemRouter;