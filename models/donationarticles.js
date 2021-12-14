
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./users');

const donatedarticleSchema = new Schema({
    title: String,
    description: String,
    location: String,
    category: {
        type: String,
        enum: ['Articole vestimentare', 'Obiecte de uz casnic', 'Alimente neperisabile']
    },
    images: [
        {
            url: String,
            filename: String
        }
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Article', donatedarticleSchema);