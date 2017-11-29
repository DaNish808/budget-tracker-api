const { Router } = require('express');
const router = Router();
const Photo = require('../models/Photo');

module.exports = router
    .get('/', (req, res, next) => {
        Photo.find({})
            .lean()
            .then(got => res.send(got))
            .catch(next);
    })
    .post('/', (req, res, next) => {
        new Photo(req.body)
            .save()
            .then(saved => res.send(saved))
            .catch(next);
    })
    .delete('/:ids', (req, res, next) => {
        const ids = req.params.ids.split(',');
        Photo.remove({ _id: { $in: ids } })
            .then(removed => res.send({ removed: !!removed }))
            .catch(next);
    })
;