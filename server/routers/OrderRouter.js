const express = require('express');
const OrderRouter = express.Router();
const OrderSchema = require('../models/order.model');
const GeneralSchema = require('../models/general.model');


OrderRouter.get('/get', function (req, res) {
    console.log('getting all orders');
    OrderSchema.find({})
        .exec(function (err, order) {
            if (err) {
                res.send(404, 'Error has occurred!')
            } else {
                console.log(order);
                res.json(order);
            }
        });
});




// get one Member
OrderRouter.get('/getOrderByUser/:id', function (req, res) {
    OrderSchema.findOne({ personId: req.params.id }, {}, { $orderby: { createdDate: -1 } }).exec(function (err, order) {
        if (err) {
            console.log(err);
            res.send(404, 'Error Occurred!')
        } else {
            console.log('getOrderByUser ' + order);
            res.json(order);
        }
    });
});

// get grouping of orders by date-for calender 
OrderRouter.get('/getGroupingOrders', function (req, res) {
    console.log('getGroupingOrders');
    OrderSchema.aggregate([ {$group : 
        {_id:"$createdDate", 
        total:{$sum:1}}}, 
        {$sort:{createdDate:-1}}]
        ).exec(function (err, orderGroup) {
        if (err) {
            console.log('getGroupingOrders error lookup - ' + err)
            res.status(404).send('getGroupingOrder Error has occurred! - ' + err);
        } else {
            console.log(orderGroup);
            res.json(orderGroup);
        }
    });
});


// get one Member
OrderRouter.get('/get/:id', function (req, res) {
    console.log('getting on Member');
    OrderSchema.findOne({
        _id: req.params.id // body-parser did it !!!!
    }).exec(function (err, order) {
        if (err) {
            console.log(err);
            res.send(404, 'Error occurred!')
        } else {
            console.log(order);
            res.json(order);
        }
    });
});

// get one Member
OrderRouter.get('/getByCart/:id', function (req, res) {
    console.log('getting on cart');
    OrderSchema.findOne({
        cartId: req.params.id // body-parser did it !!!!
    }).exec(function (err, order) {
        if (err) {
            console.log(err);
            res.send(404, 'Error occurred!')
        } else {
            console.log('order' + order);
            res.json(order);
        }
    });
});

///cart with status open????
OrderRouter.route('/addOrder').post(function (req, res) {
    //OrderRouter.post('/add', function (req, res) {
    const orderData = new OrderSchema(req.body);
    //check if exists same item and cart in the collection. so just do update 
    // console.log( 'itemId:'+ req.body.itemId + 'cartId:'+req.body.cartId)
    OrderSchema.find({ itemId: req.body.itemId, cartId: req.body.cartId }, function (err, docs) {
        if (docs.length) {
            //todo update  change button!!!!! 
            console.log('docs - ' + JSON.stringify(docs));
            res.status(499).send("Order already exists");
        } else {
            console.log(orderData);

            orderData.save()
                .then(orderD => {
                    //inc orders in general.ordersCount
                    //  GeneralSchema.find({}, function (err, docs) {
                    GeneralSchema.findOneAndUpdate({}, { $inc: { ordersCounter: 1 } },
                        { new: true }, function (err, response) {
                            if (err) {
                                console.log('err ' + err);
                            } else {

                                console.log('GeneralSchema response  ' + response);
                            }
                        });
                    res.json('Order added successfully');
                })
                .catch(err => {
                    res.status(400).send("unable to save to database");
                    console.log(err);
                });
        }
    });
});
//todo change geral.orderscount
// Update document
//todo update
OrderRouter.put('/update/:id', function (req, res) {
    OrderSchema.findOneAndUpdate(
        {
            _id: req.params._id // [query]
        },
        {
            $set: {
                //todo update
                count: req.body.count // [doc]
            }
        },
        {
            upsert: true      // [options] if this document has no title create one
        },
        function (err, updOrder) {
            if (err) {
                console.log('error occured');
            } else {
                console.log('updOrder - ' + updOrder);
                res.status(204).send(updOrder);
            }
        });
});


OrderRouter.delete('/delete/:id', function (req, res) {
    OrderSchema.delete({ cartId: req.params.id }, function (err, cartItem) {
        if (err) {
            res.json('error deleting')
        } else {
            console.log(cartItem['deletedCount']);
            //dec generalColl.ordersCounter
            //todo check
            GeneralSchema.findOneAndUpdate({}, { $inc: { ordersCounter: -1 } },
                { new: true }, function (err, response) {
                    if (err) {
                        console.log('GeneralSchema err ' + err);
                    } else {

                        console.log('GeneralSchema dec response  ' + response);
                    }
                });
            res.status(204).send(JSON.stringify(cartItem['deletedCount']));
        }
    });
});
module.exports = OrderRouter;