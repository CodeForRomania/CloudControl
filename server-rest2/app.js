/**
 * Module dependencies.
 */
var restify = require('restify'),
    util = require('util'),
    db = require('./database');

var server = restify.createServer({
    name: 'iserver'
});

var Auth = require('./middlewares/auth')(server);
server
    .use(restify.fullResponse())
    .use(restify.bodyParser({
        mapParams: false
    }))
    .use(restify.queryParser())

    .use(Auth.init);

server.listen(3000, function() {
    console.log('%s Server listening at %s', server.name, server.url);
});

     server.post('/login/', function(req, res, next) {
        Auth.init(res, res, next);
     });

/*server.get('/api/users/:1',
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
*/

