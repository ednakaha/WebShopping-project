mongoose = require('mongoose');
var Schema = mongoose.Schema;

const PersonSchema = new Schema({
  //  id: Number,
    tz:String,
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    cityId: String,
    street: String,
    roleId: Number
},{
    collection: 'personsColl'
});

module.exports = mongoose.model('Person', PersonSchema); 