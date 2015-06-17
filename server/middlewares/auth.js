'use strict';

var LocalStrategy = require('passport-local').Strategy;
var BearerStrategy = require('passport-http-bearer').Strategy;
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt-nodejs');

module.exports = function(db, jwt_secret, jwt_expiry) {
    return {
        local: new LocalStrategy(function(username, password, done) {
            db.User.find({
                    where: {
                        email: username
                    }
                })
                .then(function(user) {
                    if (!user) {
                        return done(null, false, {
                            message: 'Unknown user'
                        });
                    }

                    bcrypt.hash(password, user.salt, null, function(err, response) {
                        if (err) {
                            return done(err);
                        }
                        if (response !== user.password) {
                            return done(null, false);
                        }
                        console.log('sequelize find user', user);
                        return done(null, {
                            username: user.email,
                            id: user.id
                        });
                    });
                });
        }),

        bearer: new BearerStrategy(function(token, done) {
            jwt.verify(token, jwt_secret, function(err, decoded) {
                if (err) {
                    return done(err);
                }
                return done(null, {
                    username: decoded.iss,
                    id: decoded.uid
                });
            });
        }),

        issue: function(req, res, next) {
            var claims = {
                iss: req.user.username,
                uid: req.user.id || 100,
                admin: true
            };

            var token = jwt.sign(claims, jwt_secret, {
                ttl: jwt_expiry
            });

            res.json({
                'token': token,
                "id": claims.uid
            });
            next();
        },

        register: function(req, res, next) {
            var username = req.body.username,
                password = req.body.password;

            bcrypt.genSalt(100, function(err, salt) {
                if (err) {
                    return res.send(err);
                }
                bcrypt.hash(password, salt, null, function(err, hashed) {
                    if (err) {
                        return res.send(err);
                    }

                    db.User.create({
                            email: username,
                            password: hashed,
                            salt: salt
                        })
                        .then(function(user) {
                            console.log("User created", user);
                            if (user) {
                                res.json({
                                    email: user.email
                                });
                                return next();
                            }
                        })
                        .catch(function(err) {
                            console.log(err);

                            var error = new Error(err);
                            error.status = 500;

                            res.send(JSON.stringify(error));
                        });

                });
            });
        }
    };
}
