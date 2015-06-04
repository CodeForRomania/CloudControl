var Q = require("q");
module.exports = function(passport) {

    return {
        login: function(data) {
            return Q.Promise(function(resolve, reject, notify) {
                var email = data.email,
                    password = data.password,
                    error = !email || !password || email.indexOf('@') < 0 || email.indexOf('.') < 0;

                if (error) {
                    reject(new Error('Credentials are missing'));
                }

                passport.authenticate('local', email, password, function() {
                    console.log(arguments);
                });

            });
        },
    };
};
