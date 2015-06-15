 var passport = require('passport'),
     putils = require('../putils'),
     LocalStrategy = require('passport-local').Strategy,
     BearerStrategy = require('passport-http-bearer').Strategy;

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
                 if (user.password !== password) {
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

 function initAuth(server) {

     console.log(3, req);
     server.use(passport.initialize());
     initRoutes(server);
 }

 function initRoutes(req, res, next) {
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
 }

 module.exports = function(server) {
     server.use(passport.initialize());
     return {
         init: initRoutes
     };
 };
