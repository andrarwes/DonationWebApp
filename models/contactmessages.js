const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema({
    name:String,
    email:String,
    description:String
});

module.exports = mongoose.model('Message',contactSchema);