var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user');

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
passport.use(new LocalStrategy(
    {
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


var app = express();
var api = require('./routes/api');


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.set('trust proxy', 1); // trust first proxy


app.use(session({
    secret: 'CCDash'
}));

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
        res.sendStatus(200);
    } else {
        next();
    }
};

app.use(cookieParser());
app.use(allowCrossDomain);

app.use(passport.initialize());
app.use(passport.session());

// api calls 
app.use('/login', function(req, res, next) {
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
});
app.use('/logout', function(req, res) {
    req.logout();
    res.sendStatus(200);
});

app.use('/api', ensureAuthenticated, api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        if (err) {
            err = {
                error: err
            };
            res.json(err);
        } else {
            res.sendStatus(err.status || 500);
        }
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.sendStatus(err.status || 500);
});

function ensureAuthenticated(req, res, next) {
    console.log('middleware');
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.sendStatus(403);
    }

}
module.exports = app;
