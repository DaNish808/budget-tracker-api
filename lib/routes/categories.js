const { Router } = require('express');
const router = Router();
const expenseRouter = require('./expenses');
const Category = require('../models/Category');

module.exports = router
    .use('/:id/expenses', expenseRouter)
    .get('/', (req, res, next) => {
        const promises = [
                Category.find()
                .then(mongoRes => {
                    mongoRes.forEach(cat => cat.totalExpenses = cat.totalExpenses);
                    return mongoRes;
                }),
                Category.totalBudget()
            ];
        return Promise.all(promises)
            .then(([ categories, totalBudget ]) => {
                return res.send({ categories, totalBudget: totalBudget[0]['total_budget'] });
            })
            .catch(next);
    })
    // .get('/', (req, res, next) => {
    //     const promises = [
    //         Category.fullAccount(),
    //         Category.totalBudget()
    //     ];
    //     return Promise.all(promises)
    //         .then(([ categories, totalBudget ]) => {
    //             return res.send({ categories, totalBudget: totalBudget[0]['total_budget'] });
    //         })
    //         .catch(next);
    // })
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
            { new: true, runValidators: true }
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