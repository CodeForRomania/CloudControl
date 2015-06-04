var Q = require("q");
var Strategy = require('../modules/auth-strategies');

var Auth = {
    logout: function() {
        console.log('logout');
    }
};

module.exports = function(passport) {

        return {
            login: function(data) {
        var strategy = Strategy(passport);
                return Q.Promise(function(resolve, reject, notify) {
                        var email = data.email,
                            password = data.password,
                            error = !email || !password || email.indexOf('@') < 0 || email.indexOf('.') < 0;

                        if (error) {
                            reject(new Error('Credentials are missing'));
                        }
                        passport.authentificate(email, password, function() {
                            console.log(arguments);
                            resolve(arguments);
                        });

                    });
                },
            }
        };
