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
;