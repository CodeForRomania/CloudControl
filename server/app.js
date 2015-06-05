var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');

var Auth = require('./middlewares/auth')(passport);
console.log(Auth);


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
app.use('/login', Auth.login);
app.use('/logout', Auth.logout);

app.use('/api', Auth.ensureAuthenticated, api);

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

module.exports = app;
