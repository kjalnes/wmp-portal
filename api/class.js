 app = require('express').Router();
const models = require('../models/').models;

module.exports = app;

app.post('/', (req, res, next) => {
    models.Class.create(req.body)
    .then( schoolClass => res.send(schoolClass))
    .catch(next)
});

app.get('/:semester', (req, res, next) => {
    models.Class.findAll({where: { semester: req.params.semester }})
    .then( classes => {
        res.send(classes)
    })
    .catch(next)
});
