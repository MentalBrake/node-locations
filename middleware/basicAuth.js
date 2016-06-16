var auth = require('basic-auth');

module.exports = function (req, res, next) {
    var credentials = auth(req);

    if (!credentials || credentials.name !== 'admin' || credentials.pass !== '1234') {
        res.statusCode = 401;
        res.end('Access denied');
    } else {
        next();
    }
};