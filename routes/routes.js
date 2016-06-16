"use strict";

var geoController = require('../controllers/geoCodeController'),
    wikiNearbyController = require('../controllers/wikiNearbyController'),
    auth = require('../middleware/basicAuth');

module.exports = function (app) {
    var geoCodeCache = {},
        wikiNearbyCache = {},
        requestsHistory = []; // Saving only urls with querystring, can be expended with any data from the requests

    app.get('/geocode', function (req, res, next) {
        requestsHistory.push(req.originalUrl);

        geoController.getCoordinates(geoCodeCache, req, res, next)
    });
    app.get('/wikiNearby', function (req, res, next) {
        requestsHistory.push(req.originalUrl);

        wikiNearbyController.getWikiNearbyInfo(wikiNearbyCache, req, res, next);
    });

    app.post('/purgeCache', function (req, res, next) {
        requestsHistory.push(req.originalUrl);

        geoCodeCache = {};
        wikiNearbyCache = {};
        res.send('cache cleared');
    });


    app.get('/usage', auth, function(req, res, next){

        // usage requests doesn't go to requests history so it won't add additional noise

        res.send(requestsHistory);
    })
};