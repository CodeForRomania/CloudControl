/*jslint indent: 2 */
function find(db, username, callback) {
  return db.get(
    'SELECT * FROM users WHERE username=?',
    username,
    callback
  );
}
