import DS from 'ember-data';


var User = DS.Model.extend({
    email: DS.attr('String'),
    username: DS.attr('String'),
    password: DS.attr('String'),
    profile: DS.belongsTo('profile'),
    groups: DS.hasMany('group')
});

export default User;
