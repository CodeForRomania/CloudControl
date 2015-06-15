/*jslint indent: 2 */
function createLocalStrategy(db) {
  return new LocalStrategy(function (username, password, done) {
    db.find(username, function (err, dbUser) {
      if (err) { return done(err); }
      if (!dbUser) { return done(null, false); }

      bcrypt.hash(password, dbUser.salt, null, function (err, res) {
        if (err) { return done(err); }
        if (res !== dbUser.password) { return done(null, false); }
        return done(null, {username: dbUser.username});
      });
    });
  });
}
