"use strict";

var geocodeApi = require('../services/geocodeApi');


module.exports.getCoordinates = function (cache, req, res, next) {

    var address = req.query.address;

    if (!address) {
        res.status(400);
        res.send('address required');
        return this;
    }


    address = address.replace(/ /g, '+');


    if (cache[address]) {
        res.send(cache[address]);
    } else {
        geocodeApi.getCoordinatesByAddress(address)
            .then(function (coordinates) {
                cache[address] = coordinates;
                res.send(coordinates);
            }).catch(function (err) {
                res.status(400);
                res.send(err);
            });
        ;
    }
};