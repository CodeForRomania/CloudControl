/**
 * Module dependencies.
 */
var restify = require('restify'),
    passport = require('passport'),
    util = require('util'),
    putils = require('./putils'),
    fs = require("fs"),
    LocalStrategy = require('passport-local').Strategy,
    BearerStrategy = require('passport-http-bearer').Strategy;


var server = restify.createServer({
    //certificate: fs.readFileSync('certs/certificate.pem'),
    //key: fs.readFileSync('certs/privatekey.pem'),
    name: 'my-secure-api'
});

var users = [{
    id: 1,
    username: 'admin@admin.com',
    password: 'password',
    token: '123456789',
    email: 'francesco@example.com'
}, {
    id: 2,
    username: 'alessandro',
    password: 'test2',
    token: 'abcdefghi',
    email: 'alessandro@example.com'
}];

server
    .use(restify.fullResponse())
    .use(restify.bodyParser({
        mapParams: false
    }))
    .use(restify.queryParser())
    .use(passport.initialize());

passport.use(new LocalStrategy({},
    function(username, password, done) {
        process.nextTick(function() {
            findByUsername(username, function(err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false, {
                        message: 'Unknown user ' + username
                    });
                }
                if (user.password != password) {
                    return done(null, false, {
                        message: 'Invalid password'
                    });
                }
                return done(null, user);
            });
        });
    }
));


// Use the BearerStrategy within Passport.
passport.use(new BearerStrategy({},
    function(token, done) {
        process.nextTick(function() {
            findByToken(token, function(err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false);
                }
                return done(null, user);
            })
        });
    }
));

server.listen(3000, function() {
    console.log('%s Server listening at %s', server.name, server.url);
});

server.get('/api/users/:1',
    passport.authenticate('bearer', {
        session: false
    }),
    function(req, res) {
        console.log(req.isAuthenticated());
        res.json({
            username: req.user.username,
            email: req.user.email
        });
    });

server.post('/login/', function(req, res, next) {

    passport.authenticate('local', {
            session: false
        },
        function(err, user, info) {

            if (err) {
                return res.send({
                    'status': 'err',
                    'message': err.message
                });
            }
            if (!user) {
                return res.send({
                    'status': 'fail',
                    'message': info.message
                });
            }
            var token = putils.uid(256);
            user.token = token;
            return res.send({
                'status': 'ok',
                'user': user,
                token: token
            });

        })(req, res, next);
});


function findByToken(token, fn) {
    for (var i = 0, len = users.length; i < len; i++) {
        var user = users[i];
        if (user.token === token) {
            return fn(null, user);
        }
    }
    return fn(null, null);
}

function findByUsername(username, fn) {
    for (var i = 0, len = users.length; i < len; i++) {
        var user = users[i];
        if (user.username === username) {
            return fn(null, user);
        }
    }
    return fn(null, null);
}
