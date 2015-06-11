var express = require('express');
var router = express.Router();

module.exports = function() {

    router
        .get('/', function(req, res, next) {
        console.log(req, res, res.isAuthenticated());
            res.sendStatus(200);
        })
        .get('/users', function(req, res, next) {
            console.log(req.query);
        })
        .get('/users/:id', function(id, req, res, next) {
            console.log(12666666666666666666666666666666663);
            console.log(req.query, id);
        });
    return router;
};
