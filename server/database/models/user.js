var Sequelize = require('sequelize'),
    DataTypes = Sequelize;

var sequelize = new Sequelize("ccDashDB", "CC", "CCDash", {
  dialect: 'sqlite',
  storage: "database/db/database.sqlite"
});

var User = sequelize.define('User', {
  email: DataTypes.STRING,
  password: DataTypes.STRING
});

User.sync();

var user = User.create({ email: "admin@admin.com", password: "password" });

module.exports = User;

//import DS from 'ember-data';


//var User = DS.Model.extend({
    //email: DS.attr('String'),
    //password: DS.attr('String'),
    //profile: DS.belongsTo('profile'),
    //groups: DS.hasMany('group')
//});

//export default User;
