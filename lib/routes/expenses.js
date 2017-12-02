const { Router } = require('express');
const router = Router({ mergeParams: true });
const Category = require('../models/Category');

module.exports = router
    .patch('/', (req, res, next) => {
        console.log('in expenses:', req.params.id)
        Category.findByIdAndUpdate(
            req.params.id, 
            { $push: { expenses: req.body} },
            { new: true, runValidators: true }
        )
        .lean()
        .then(updated => res.send(updated))
        .catch(next)
    })
;