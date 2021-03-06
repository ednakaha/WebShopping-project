mongoose = require('mongoose');
var Schema = mongoose.Schema;

const ItemSchema = new Schema({
   // id: Number,
    name: String,
    categoryId: String,
    price: Number,
    picturePath: String
},{
    collection: 'ItemsColl'
});

module.exports = mongoose.model('Item', ItemSchema); 