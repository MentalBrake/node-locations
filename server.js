"use strict";


process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('./config/express'),
    config = require('./config/config');

var app = express();

app.listen(config.port);