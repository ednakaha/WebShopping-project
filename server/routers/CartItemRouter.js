const express = require('express');
const CartItemRouter = express.Router();
const CartItemSchema = require('../models/cartItem.model');
const CartSchema = require('../models/cart.model');


CartItemRouter.get('/get', function (req, res) {
    console.log('getting all cart items');
    CartItemSchema.find({})
        .exec(function (err, cartItems) {
            if (err) {
                res.send(404, 'Error has occurred!')
            } else {
                console.log(cartItems);
                res.json(cartItems);
            }
        });
});


// get cart item's data with more data of username and price from Item table
CartItemRouter.get('/cartItemForTextFile/:id', function (req, res) {
    console.log('cartItemExpanded ' + JSON.stringify(req.params));
    CartItemSchema.aggregate([
        { $match: { 'cartId': req.params.id } },
        { "$addFields": { "itemId_obj": { "$toObjectId": "$itemId" } } },
        {
            $lookup:
            {
                from: "ItemsColl",
                localField: "itemId_obj",
                foreignField: "_id",
                as: "itemDetailsArr"
            }
        }
    ]).exec(function (err, cartItemsEx) {
        console.log('in lookup')
        if (err) {
            console.log('error lookup - ' + err)
            res.status(404).send('Error has occurred! - ' + err);
        } else {
            console.log(cartItemsEx);
            let textArray = [];
            let str;
            cartItemsEx.forEach(element => {
                str = element.itemDetailsArr[0].name + ' ' + element.sum;
                //     str = str.split('\n');
                console.log('element' + str);
                textArray.push(str);
            });

            res.json(textArray);
        }
    });
});

// get cart item's data with more data of username and price from Item table
CartItemRouter.get('/cartItemExpanded/:id', function (req, res) {
    console.log('cartItemExpanded ' + JSON.stringify(req.params));
    CartItemSchema.aggregate([
        { $match: { 'cartId': req.params.id } },
        { "$addFields": { "itemId_obj": { "$toObjectId": "$itemId" } } },
        {
            $lookup:
            {
                from: "ItemsColl",
                localField: "itemId_obj",
                foreignField: "_id",
                as: "itemDetailsArr"
            }
        }
    ]).exec(function (err, cartItemsEx) {
        console.log('in lookup')
        if (err) {
            console.log('error lookup - ' + err)
            res.status(404).send('Error has occurred! - ' + err);
        } else {
            console.log(cartItemsEx);
            res.json(cartItemsEx);
        }
    });
});


// get one Member
CartItemRouter.get('/get/:id', function (req, res) {
    console.log('getting on Member');
    CartItemSchema.findOne({
        _id: req.params.id // body-parser did it !!!!
    }).exec(function (err, cartItem) {
        if (err) {
            console.log(err);
            res.send(404, 'Error occurred!')
        } else {
            console.log(cartItem);
            res.json(cartItem);
        }
    });
});


CartItemRouter.post('/add', function (req, res) {
    const cartItemData = new CartItemSchema(req.body);
    //check if exists same item and cart in the collection. so just do update 
    //  console.log( 'itemId:'+ req.body.itemId + 'cartId:'+req.body.cartId)
    CartItemSchema.find({ itemId: req.body.itemId, cartId: req.body.cartId }, function (err, docs) {
        if (docs.length) {
            //todo update  change button!!!!! 
            console.log('docs - ' + JSON.stringify(docs));
            res.status(499).send("Cart item already exists");
        } else {
            console.log(cartItemData);

            cartItemData.save()
                .then(cartItemD => {
                    console.log('-------------')
                    //update field cart.
                    //todo !!!!!!!! doesn't work 
                    try {
                        console.log('cartid' + req.body.cartId)
                        CartSchema.updateOne({ cartId: req.body.cartId },
                            { $set: { updateDate: new Date() } },
                            function (err, response) {
                                if (err) {
                                    console.log('itemsCounter err ' + err);
                                } else {
                                    console.log('GeneralSchema response  ' + response);
                                }
                            })
                    }
                    catch (e) {
                        print('cartItem-update cart ' + e);
                    };


                    res.json('Item added successfully');


                })
                .catch(err => {
                    res.status(400).send("unable to save to database");
                });
        }
    });
});

// Update document
//todo update
//todo table with sum cartitems and.....
CartItemRouter.put('/update/:id', function (req, res) {
    CartSchema.findOneAndUpdate(
        {
            _id: req.params._id // [query]
        },
        {
            $set: {
                count: req.body.count // [doc]
            }
        },
        {
            upsert: true      // [options] if this document has no title create one
        },
        function (err, updCartItem) {
            if (err) {
                console.log('error occured');
            } else {
                console.log('updCartItem - ' + updCartItem);
                res.status(204).send(updCartItem);
            }
        });
});

// Delete all cart document
CartItemRouter.delete('/delete/:id', function (req, res) {
    CartItemSchema.deleteMany({ cartId: req.params.id }, function (err, cartItem) {
        if (err) {
            res.send('error deleting')
        } else {
            console.log(cartItem['deletedCount']);
            res.status(204).send(JSON.stringify(cartItem['deletedCount']));
        }
    });
});

//Delete cartItem By id
CartItemRouter.delete('/deleteCartItem/:id', function (req, res) {
    console.log('in deleteCartItem')
    CartItemSchema.deleteOne({ _id: req.params.id }, function (err, cartItem) {
        if (err) {
            console.log('deleteCartItem ' + err);
            res.send('error deleting cart item')
        } else {
            console.log('deleteCartItem' + req.params.id);//cartItem['deletedCount']);
                 res.status(204).send(JSON.stringify(cartItem['deletedCount']));
        }
    });
});
module.exports = CartItemRouter;