const app = require('express').Router();
const countries = require('country-list');
const wc = require('which-country');
const getCountryISO2 = require("country-iso-3-to-2");


app.get('/:countryCode', (req, res, next) => {
    const { countryCode } = req.params;
    const country = countries.getName(countryCode);
    res.send({ country });
});


app.get('/:lat/:lng', (req, res, next) => {
    const { lat, lng } = req.params;
    const iso3 = wc([ lng, lat ]);
    const iso2 = getCountryISO2(iso3);
    res.send({ countryCode: iso2 });
});

module.exports = app;
