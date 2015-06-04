var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        console.log(user, done);
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        console.log(id);
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
            usernameField: 'email',
            passwordField: 'password'
        },
        function(username, password, done) {
            console.log(email);
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
};
// Serialize sessions
