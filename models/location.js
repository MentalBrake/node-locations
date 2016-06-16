function Location(dto) {
    this.coordinates = {
        lat: dto.lat,
        lon: dto.lon
    };
    this.address = dto.address;
    this.title = dto.title;
    this.thumbnailUrl = dto.thumbnailUrl;

    this.getCoordinates = function () {
        return this.coordinates;
    }
}

module.exports = Location;