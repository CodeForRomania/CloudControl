var express = require('express');
var router = express.Router();

module.exports = function() {
    /* Posts routes */
    router.use('/', require('./api'));

    return router;
};
