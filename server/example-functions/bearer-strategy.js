/*jslint indent: 2 */
function createBearerStrategy(jwt_secret) {
  return new BearerStrategy(function (token, done) {
    jwt.verify(token, jwt_secret, function (err, decoded) {
      if (err) { return done(err); }
      return done(null, {username: decoded.iss});
    });
  });
}
