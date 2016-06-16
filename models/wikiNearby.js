function WikiNearby() {
    this.locations = [];

    this.addLocation = function (location) {
        this.locations.push(location);
    };

    this.getLocations = function () {
        return this.locations;
    }
}

module.exports = WikiNearby;