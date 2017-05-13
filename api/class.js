 app = require('express').Router();
const models = require('../models/').models;

module.exports = app;

app.post('/', (req, res, next) => {
    models.Class.create(req.body)
    .then( schoolClass => res.send(schoolClass))
    .catch(next)
});


app.get('/', (req, res, next) => {
    models.Class.findAll({where: { semester: 'fall-17'}})
    .then( classes => {
        console.log('classes', classes)
        res.send(classes)
    })
    .catch(next)
});
