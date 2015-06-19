import DS from 'ember-data';

var Profile = DS.Model.extend({
    name: DS.attr('String'),
    avatar: DS.attr('String'),
    user: DS.belongsTo('user'),
    verified: DS.attr('Boolean', {
        defaultValue: false
    })
});

export default Profile;
