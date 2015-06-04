var express = require('express');
var router = express.Router();

module.exports = function(passport) {
    /* Posts routes */
    router.use('/auth', require('./api/auth')(passport));

    return router;
};

