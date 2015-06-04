var Sequelize = require('sequelize'),
    DataTypes = Sequelize;

var sequelize = new Sequelize("ccDashDB", "CC", "CCDash", {
  dialect: 'sqlite',
  storage: "database/database.sqlite"
});

var User = sequelize.define('User', {
  email: DataTypes.STRING,
  password: DataTypes.STRING
});

User.sync();

var user = User.create({ email: "admin@admin.com", password: "ipasu" });

module.exports = User;

