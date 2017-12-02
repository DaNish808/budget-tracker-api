const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    budget: {
        type: Number,
        required: true
    },
    expenses: [{
        name: {
            type: String,
            required: true
        },
        value: {
            type: Number,
            required: true
        }
    }]
},
{
    timestamps: {
        createdAt: 'timestamp',
        updatedAt: 'timestamp'
    }
});

module.exports = mongoose.model('Category', schema);