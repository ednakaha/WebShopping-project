const express = require('express');
const CartRouter = express.Router();
const CartSchema = require('../models/cart.model');

CartRouter.get('/get', function (req, res) {
    console.log('getting all cart items');
    CartSchema.find({})
        .exec(function (err, carts) {
            if (err) {
                res.send(404, 'Error has occurred!')
            } else {
                console.log(carts);
                res.json(carts);
            }
        });
});

// get one Member
CartRouter.get('/get/:id', function (req, res) {
    console.log('getting on Member');
    CartSchema.findOne({
        _id: req.params.id // body-parser did it !!!!
    }).exec(function (err, cart) {
        if (err) {
             res.send(404, 'Error Occurred!')
        } else {
            res.json(cart);
        }
    });
});

// get one Member
CartRouter.get('/getCartByUser/:id', function (req, res) {
     CartSchema.findOne({ personId: req.params.id }, {}, { $orderby: { updateDate: -1 } }).exec(function (err, cart) {
        if (err) {
            res.send(404, 'Error Occurred!')
        } else {
            res.json(cart);
        }
    });
});

//get exists cart , if not-create a new one
CartRouter.get('/getOrSetCart/:id', function (req, res) {
    let isNew = true; 

    CartSchema.find({ personId: req.params.id }, function (err, data) {
        if (err) {
            res.status(400).send('getorset error - ' + err);
        } else {
            if (data.length > 0) {
                console.log('cart founded-' + JSON.stringify(data));
                isNew = false;
            }
            let openCartRow = data.filter(cart => {
                return cart.status === 1;
            });
            if (openCartRow.length === 0) {//create new cart
                console.log('getOrSet new cart , isNew:' + isNew);
                const cartData = new CartSchema();
                cartData.personId = req.params.id;
                cartData.status = 1;//open
                cartData.createDate = new Date();
                cartData.updateDate = new Date();
                cartData.save()
                    .then(cartD => {
                        res.json({
                            status: 'New cart added successfully',
                            cartData: cartD,
                            isNew
                        });
                    })
                    .catch(err => {
                        res.status(400).send("unable to save to database " + err);
                    });
            }
            else {
                res.json({
                    cartData: openCartRow,
                    isNew
                });
            }
        }
    });
});

CartRouter.route('/add').post(function (req, res) {
    console.log('req.name ' + req.params.name);
    const cartData = new CartSchema(req.body);

    CartSchema.find({ id: req.body.id }, function (err, docs) {
        if (docs.length) {
            res.status(499).send("Cart  already exists");
        } else {
            cartData.save()
                .then(CartD => {
                    res.json('Cart  added successfully');
                })
                .catch(err => {
                    res.status(400).send("unable to save to database");
                });
        }
    });
});
// Update document
CartRouter.put('/update/:id', function (req, res) {
    CartSchema.findOneAndUpdate(
        {
            _id: req.params.id // [query]
        },
        {
            $set: {
                count: req.body.name // [doc]
            }
        },
        {
            upsert: true      // [options] if this document has no title create one
        },
        function (err, updCart) {
            if (err) {
                res.status(404).send(err);
            } else {
                res.status(204).send(updCart);
            }
        });
});

// Delte document
CartRouter.delete('/delete/:id', function (req, res) {
    CartSchema.findOneAndRemove(
        {
            _id: req.params.id
        }, function (err, cart) {
            if (err) {
                res.json('error deleting')
            } else {
                console.log(cart);
                res.status(204).json(cart);
            }
        });
});
//Update total sum
CartRouter.put('/updateTotal', function (req, res) {
    CartSchema.findOneAndUpdate(
        {
            _id: req.params.id
        },
        {
            $set: {
                sum: req.params.sum
            }
        },
        function (err, updCart) {
            if (err) {
                console.log('updateTotal error occured');
            } else {
                console.log('updateTotal '+updCart);
                res.status(204).send(updCart);
            }
        });
});


module.exports = CartRouter;
