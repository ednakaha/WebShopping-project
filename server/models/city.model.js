
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const City = new Schema({
  //id: Number,
  name:String},{
    collection: 'citysColl'
});

module.exports = mongoose.model('City', City);