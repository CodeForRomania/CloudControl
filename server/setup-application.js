var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var setupCrossDomain = require('./middlewares/setupCORS');

module.exports = function(app, passport) {

    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: false
    }));

    app.set('trust proxy', 1); // trust first proxy


    app.use(session({
        secret: 'CCDash',
        resave: true,
        saveUninitialized: true
    }));


    app.use(cookieParser());
    app.use(setupCrossDomain);

    app.use(passport.initialize());
    app.use(passport.session());

    return app;
}
