
mongoose = require('mongoose');
var Schema = mongoose.Schema;

const OrderSchema = new Schema({
    //  id:string;
    personId: String,
    cartId: String,
    finalSum: Number,
    cityIdShip: String,
    streetShip: String,
    dateShip: Date,
    createdDate: Date,
    lastPaymentCreditCard: String,
    status:Number 
}, {
        collection: 'ordersColl'
    });

module.exports = mongoose.model('Order', OrderSchema); 