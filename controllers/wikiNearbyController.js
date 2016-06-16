"use strict";

var wikiNearbyApi = require('../services/wikiNearbyApi');


module.exports.getWikiNearbyInfo = function (cache, req, res, next) {

    var lon = req.query.lon,
        lat = req.query.lat;

    if (!lon || !lat){
        res.status(400);
        res.send('lon and lat are required');
        return this;
    }

    var key = lon + lat;

    if (cache[key]) {
        res.send(cache[key]);
    } else {
        wikiNearbyApi.getWikiNearbyInfo(lon, lat)
            .then(function (coordinates) {
                cache[key] = coordinates;
                res.send(coordinates);
            }).catch(function(err){
                res.status(400);
                res.send(err);
            });
    }
};