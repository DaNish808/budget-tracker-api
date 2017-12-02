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
        console.log('eId', req.params.eId)
        console.log('category id', req.params.id)
        console.log('updates', req.body)
        // Category.findByIdAndUpdate(
        //     req.params.id,
        //     { $pull: { expenses: { _id: req.params.eId } } },
        //     { new: true, runValidators: true }
        // )
        // .lean()
        // .then(updated => res.send(updated))
        // .catch(next);
    })
;