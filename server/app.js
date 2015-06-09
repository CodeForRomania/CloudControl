var express = require('express');
var path = require('path');
var passport = require('passport');
var setupApp = require('./setup-application');



var app = express();

app = setupApp(app, passport);

app.locals.db = require('./database/');

var api = require('./routes/api')(app);


var Auth = require('./middlewares/auth')(passport, app);
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
