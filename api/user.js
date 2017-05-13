const app = require('express').Router();
const models = require('../models/db').models;

module.exports = app;

app.post('/', (req, res, next) => {
    models.User.create({name: 'Wes', password:'123'})
})
