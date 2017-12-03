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
    // toObject: { virtuals: true },
    // toJSON: { virtuals: true },
    timestamps: {
        createdAt: 'timestamp',
        updatedAt: 'timestamp'
    }
});

// TODO: get virtual getter to populate

// schema.virtual('totalExpenses').get(function() {
//     console.log('in virtual');
//     return this.expenses.reduce((sum, expense) => sum + expense, 0);
// });


schema.statics.totalBudget = function() {
    return this.aggregate([
        {
            $group: {
                _id: null,
                total_budget: {
                    $sum: "$budget"
                }
            }
        },
        {
            $project: {
                _id: 0,
                total_budget: 1
            }
        }
    ]);
}

schema.statics.fullAccount = function() {
    return this.aggregate([
        {
            $unwind: "$expenses"
        },
        {
            $group: {
                _id: {
                    _id: "$_id",
                    timestamp: "$timestamp",
                    name: "$name",
                    budget: "$budget",
                },
                expenses: {
                    $push: "$expenses"
                },
                total_expenses: {
                    $sum: "$expenses.value"
                }
            }
        },
        {
            $project: {
                _id: "$_id._id",
                timestamp: "$_id.timestamp",
                name: "$_id.name",
                budget: "$_id.budget",
                expenses: "$expenses",
                total_expenses: "$total_expenses",
                budget_margin: {
                    $subtract: [ "$_id.budget" , "$total_expenses" ]
                }
            }
        }
    ]);
}

module.exports = mongoose.model('Category', schema);


