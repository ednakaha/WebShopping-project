
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartItem = new Schema({
 // id: String,
  itemId:String,
  count: Number,
  sum: Number,
  cartId: String,
  createdBy: String,
  createDate: Date,
  updateDate: Date
},{
    collection: 'cartItemsColl'
});

module.exports = mongoose.model('CartItem', CartItem);
