const { Router } = require('express');
const router = Router({ mergeParams: true });
const Category = require('../models/Category');

module.exports = router
    .patch('/add', (req, res, next) => {
        Category.findByIdAndUpdate(
            req.params.id, 
            { $push: { expenses: req.body} },
            { new: true, runValidators: true }
        )
        .lean()
        .then(updated => res.send(updated))
        .catch(next);
    })
    .patch('/remove', (req, res, next) => {
        Category.findByIdAndUpdate(
            req.params.id,
            { $pull: { expenses: { _id: req.body.expenseId } } },
            { new: true, runValidators: true }
        )
        .lean()
        .then(updated => res.send(updated))
        .catch(next);
    })
    .patch('/update/:eId', (req, res, next) => {
        const expenseUpdates = {};
        const { name, value } = req.body;
        if(name) expenseUpdates['expenses.$.name'] = name;
        if(value) expenseUpdates['expenses.$.value'] = value;
        Category.update(
            { 'expenses._id': req.params.eId },
            { $set: expenseUpdates },
            { new: true, runValidators: true }
        )
        .lean()
        .then(updated => res.send(updated))
        .catch(next)
    })
;