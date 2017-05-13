 app = require('express').Router();
const models = require('../models/').models;

module.exports = app;

app.post('/', (req, res, next) => {
    console.log('req.body', req.body)
    models.Class.create(req.body)
    .then( schoolClass => res.send(schoolClass))
    .catch(next)
});
