var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');


module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.find({
            where: {
                id: id
            }
        }).success(function(user) {
            done(null, user);
        }).error(function(err) {
            done(err, null);
        });
    });

    // Use local strategy to create user account
    passport.use(new LocalStrategy(
        function(email, password, done) {
    console.log(email, password);
            User.find({
                where: {
                    email: email
                }
            }).success(function(user) {
                if (!user) {
                    done(null, false, {
                        message: 'Unknown user'
                    });
                } else if (password != user.password) {
                    done(null, false, {
                        message: 'Invalid password'
                    });
                } else {
                    done(null, user);
                }
            }).error(function(err) {
                done(err);
            });
        }
    ));
};
// Serialize sessions
