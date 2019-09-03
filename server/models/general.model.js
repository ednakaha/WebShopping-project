
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const General = new Schema({
  ordersCounter: Number,
  itemsCounter: Number
}, {
    collection: 'generalColl'
  });

module.exports = mongoose.model('General', General);

