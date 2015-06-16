'use strict';

var argv = require('minimist')(process.argv.slice(2));
var JWT_SECRET = argv.jwtSecret || 'dontdothis';
var JWT_EXPIRY = argv.jwtExpiry || 5;
var DB_PATH = argv.dbPath;
var PORT = process.env.port || 3000;

var restify = require('restify');
var passport = require('passport');

var db = require('./database')(DB_PATH);
var auth = require('./middlewares/auth')(db, JWT_SECRET, JWT_EXPIRY);

passport.use(auth.local);
passport.use(auth.bearer);

var bearerAuth = passport.authenticate('bearer', {
    session: false
});
var localAuth = passport.authenticate('local', {
    session: false
});

var server = restify.createServer({
    name: 'ccDashboard-server'
});

server.pre(restify.pre.userAgentConnection());
restify.CORS.ALLOW_HEADERS.push('authorization');
restify.CORS.ALLOW_HEADERS.push('Access-Control-Allow-Origin');
server.pre(restify.CORS({
    credentials: true,
    headers: ['authorization']
}));
server.use(restify.bodyParser({
    mapParams: false
}));
server.post('/login', localAuth, auth.issue);

server.post('/register', db.register);
var control = function(req, res, next) {
    console.log(req.headers);
    next();
};

server.get('/api/users/:id', control, bearerAuth, function(req, res, next) {
    console.log(1234455, req.params);
    res.send('Congrats, ' + req.params);
    next();
});

server.listen(PORT, function() {
    console.log('Listening at ', PORT);
});
