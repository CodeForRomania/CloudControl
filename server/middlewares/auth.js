var LocalStrategy = require('passport-local').Strategy;
var User;

module.exports = function(passport, app) {
    var User = app.locals.db.User;

    User.create({
        email: "admin@admin.com",
        password: "password"
    });

    passport.serializeUser(function(user, done) {
        done(null, user.user_id);
    });

    passport.deserializeUser(function(id, done) {
        User.find({
            where: {
                user_id: id
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
            usernameField: 'email',
            passwordField: 'password',
            //passReqToCallback: true
        },
        function(username, password, done) {
            console.log("Server info: ", username, password);
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
            console.log("Server info: ", req.body);
            passport.authenticate('local', function(err, user, info) {
                if (err) {
                    //return next(err);
                        res.writeHead( 401, err, {'content-type': 'application/json'});
                        res.end(err);
                        return;
                }
                if (!user) {
                        res.writeHead( 401, info.message, {'content-type': 'application/json'});
                        res.end(info.message);
                        return;
                    //return next(info.message);
                }
                req.logIn(user, function(err) {
                    if (err) {
                        res.writeHead( 401, err, {'content-type': 'application/json'});
                        res.end(err);
                    } else {
                        res.json({
                            user: user,
                            exp:  Date.now() + 3000
                        });
                    }
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
                res.sendStatus(401);
            }
        }
    };
};
