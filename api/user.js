const app = require('express').Router();
const models = require('../models/db').models;

module.exports = app;

app.post('/', (req, res, next) => {
    console.log('req.body', req.body)
    models.User.create(req.body)
    .then( user => res.send(user))
    .catch(next)
});
