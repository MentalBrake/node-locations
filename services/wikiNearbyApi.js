var config = require('../config/config'),
    request = require('request'),
    Q = require('q'),
    Location = require('../models/location'),
    WikiNearby = require('../models/wikiNearby');

function WikiNearbyApi() {

    this.getWikiNearbyInfo = function (lon, lat) {
        var deferred = Q.defer();
        var options = {
            method: 'POST',
            qs: {
                action: 'query',
                format: 'json',
                generator: 'geosearch',
                ggscoord: lon + '|' + lat,
                ggsradius: 10000,
                ggslimit: 10,
                prop: 'pageimages|coordinates',
                piprop: 'thumbnail',
                pithumbsize: 144,
                colimit: 10
            },
            timeout: 30000
        };

        request(config.wikiNearbyApi, options, function (err, res, body) {
            if (err || res.statusCode !== 200) {
                deferred.reject('Failed to get info from wiki. ' + err.message);
            } else {
                var results = JSON.parse(body);

                var wikiNearby = new WikiNearby();

                if (!results.query) {
                    deferred.resolve('nothing on earth matches your coordinates, make sure they are right.');
                }else{
                    var locationsData = results.query.pages;

                    for (var i in locationsData) {
                        var location = new Location({
                            title: locationsData[i].title,
                            lat: locationsData[i].coordinates[0].lat,
                            lon: locationsData[i].coordinates[0].lon,
                            thumbnailUrl: locationsData[i].thumbnail && locationsData[i].thumbnail.source
                        });

                        wikiNearby.addLocation(location);
                    }


                    deferred.resolve(wikiNearby.getLocations());
                }
            }
        });

        return deferred.promise;
    }
}

module.exports = new WikiNearbyApi();