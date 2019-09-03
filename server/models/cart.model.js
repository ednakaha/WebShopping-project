
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Cart = new Schema({
 // _id: String,
  personId:String,
  status:Number, //1-open 2-close
  createDate: Date,
  updateDate: Date
},{
    collection: 'cartColl'
});

module.exports = mongoose.model('Cart', Cart);

