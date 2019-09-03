
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Category = new Schema({
 // id: String,
  name:String},{
    collection: 'categoriesColl'
});

module.exports = mongoose.model('Category', Category);