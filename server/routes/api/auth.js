var express = require('express');
var router = express.Router();
var Q = require('q');

module.exports = function(passport) {

    var Auth = require('../../modules/auth')(passport);

    router
        .get('/', function(req, res, next) {
            res.sendStatus(200);
        })
        .get('/logout', function(req, res) {
            Auth.logout();
        })
        .post('/login', function(req, res, next) {
            var a = Auth.login(req.body);
                a.then(function(err, validated) {
                    console.log("auth ersolved");
                    if (err) {
                        next(err);
                    } else {
                        res.end("OK");
                    }
                }, function(err) {
                    console.log(err);
                    throw err;
                }, function(notify) {
                    console.log(notify);
                });
        });

    return router;
};
