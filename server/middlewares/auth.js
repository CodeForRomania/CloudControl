var LocalStrategy = require('passport-local').Strategy;
var User = require('../database//models/user');

module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.find({
            where: {
                id: id
            }
        }).then(function(user) {
            if (!user) {
                done(null, false, {
                    message: 'Unknown user'
                });
            }
            done(null, user);
        });
    });

    // Use local strategy to create user account
    passport.use(new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password',
            //passReqToCallback: true
        },
        function(username, password, done) {
            User.find({
                where: {
                    email: username
                }
            }).then(function(user) {
                if (!user) {
                    done(null, false, {
                        message: 'Unknown user'
                    });
                } else if (password !== user.password) {
                    done(null, false, {
                        message: 'Invalid password'
                    });
                } else {
                    done(null, user);
                }
            });
        }
    ));

    return {
        login: function(req, res, next) {
            passport.authenticate('local', function(err, user, info) {
                if (err) {
                    return next(err);
                }
                if (!user) {
                    return next(info.message);
                }
                req.logIn(user, function(err) {
                    if (err) {
                        return next(err);
                    }
                    res.sendStatus(200);
                });
            })(req, res, next);
        },
        logout: function(req, res) {
            req.logout();
            res.sendStatus(200);
        },
        ensureAuthenticated: function(req, res, next) {
            if (req.isAuthenticated()) {
                return next();
            } else {
                res.sendStatus(403);
            }
        }
    }
};
