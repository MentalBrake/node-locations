var config = require('../config/config'),
    request = require('request'),
    Q = require('q'),
    Location = require('../models/location');

function MetropolisApi() {

    this.getCoordinatesByAddress = function (address) {
        var deferred = Q.defer();
        var options = {
            method: 'GET',
            qs: {
                address: address
            },
            json: true,
            timeout: 30000,
            headers: {
                'X-Mashape-Key': config.geocodeApiKey
            }
        };

        request(config.geocodeApi, options, function (err, res, body) {
            if (err || res.statusCode !== 200) {
                deferred.reject('Failed to get coordinates. ' + err.message);
            } else {
                var locationDto = body.results.length > 0 && body.results[0];

                var location = new Location({
                    lat: locationDto.geometry.location.lat,
                    lon: locationDto.geometry.location.lng
                });

                deferred.resolve(location.getCoordinates());
            }
        });

        return deferred.promise;
    }
}

module.exports = new MetropolisApi();