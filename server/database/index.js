'use strict';

var bcrypt = require('bcrypt-nodejs');
var sqlite3 = require('sqlite3').verbose();

module.exports = function(path) {
    var db = new sqlite3.Database(path || __dirname + '/db/db.sqlite');

    db.run(
        'CREATE TABLE IF NOT EXISTS users ' +
        '(id INT PRIMARY KEY , username TEXT, password TEXT, salt TEXT) '
        // + 'WITHOUT ROWID'
    );


    return {
        find: function(username, callback) {
console.log(username);
            return db.get(
                'SELECT * FROM users WHERE username=?',
                username,
                callback
            );
        },
        register: function(req, res, next) {
            var username = req.body.username;
            var password = req.body.password;

            bcrypt.genSalt(100, function(err, salt) {
                if (err) {
                    return res.send(err);
                }
                bcrypt.hash(password, salt, null, function(err, hashed) {
                    if (err) {
                        return res.send(err);
                    }
                    db.run(
                        'INSERT OR FAIL INTO users VALUES (?, ?, ?, ?)',
                        null,
                        username,
                        hashed,
                        salt,
                        function(err) {
                            if (err) {
                                return res.send(err);
                            };
                            res.send('User ' + username + ' created');
                            next();
                        }
                    );
                });
            });
        }
    };
};
