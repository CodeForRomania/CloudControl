'use strict';

var LocalStrategy = require('passport-local').Strategy;
var BearerStrategy = require('passport-http-bearer').Strategy;
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt-nodejs');

module.exports = function(db, jwt_secret, jwt_expiry) {
    return {
        local: new LocalStrategy(function(username, password, done) {
            db.find(username, function(err, dbUser) {
                if (err) {
                    return done(err);
                }
                if (!dbUser) {
                    return done(null, false);
                }

                bcrypt.hash(password, dbUser.salt, null, function(err, res) {
                    if (err) {
                        return done(err);
                    }
                    if (res !== dbUser.password) {
                        return done(null, false);
                    }
                    return done(null, {
                        username: dbUser.username
                    });
                });
            });
        }),
        bearer: new BearerStrategy(function(token, done) {
            console.log(token,  'token');
            jwt.verify(token, jwt_secret, function(err, decoded) {
                if (err) {
                    return done(err);
                }
                return done(null, {
                    username: decoded.iss
                });
            });
        }),
        issue: function(req, res, next) {
            var claims = {
                iss: req.user.username,
                id: req.user.id,
                admin: true
            };

    console.log(claims);

            var token = jwt.sign(claims, jwt_secret, {
               ttl: jwt_expiry
            });

            res.json({
                'token': token,
            });
            next();
        }
    };
};
