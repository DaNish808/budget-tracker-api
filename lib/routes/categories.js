const { Router } = require('express');
const router = Router();
const Category = require('../models/Category');

module.exports = router
    .get('/', (req, res, next) => {
        Category.find({})
            .lean()
            .then(got => res.send(got))
            .catch(next);
    })
    .post('/', (req, res, next) => {
        new Category(req.body)
            .save()
            .then(saved => res.send(saved))
            .catch(next);
    })
    .patch('/:id', (req, res, next) => {
        Category.findByIdAndUpdate(
            req.params.id, 
            { $set: req.body },
            { new: true }
        )
        .lean()
        .then(updated => res.send(updated))
        .catch(next)
    })
    .delete('/:ids', (req, res, next) => {
        const ids = req.params.ids.split(',');
        Category.remove({ _id: { $in: ids } })
            .then(removed => res.send({ removed: !!removed }))
            .catch(next);
    })
;