const mongoose = require('mongoose');
const { Schema } = mongoose;

const reqString = {
    type: String,
    required: true
};

const schema = new Schema({
    title: reqString,
    url: reqString,
    albums: [],
    description: String 
});

module.exports = mongoose.model('Photo', schema);