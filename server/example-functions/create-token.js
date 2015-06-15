/*jslint indent: 2 */
function issue(jwt_secret, jwt_expiry) {
  var obj = {iss: req.user.username};
  var token = jwt.sign(obj, jwt_secret,
                       {expiresInMinutes: jwt_expiry});
  return token;
}
