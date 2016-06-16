var express = require('express'),
    routes = require('../routes/routes');

module.exports = function () {
    var app = express();

    routes(app);

    return app;
};