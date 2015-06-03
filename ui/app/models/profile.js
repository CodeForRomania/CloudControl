import DS from 'ember-data';

var Profile = DS.Model.extent({
    name: DS.attr('String'),
    avatar: DS.attr('String'),
    user: DS.belongsTo('user'),
    verified: DS.attr('Boolean', {
        defaultValue: false
    }),
    updated: DS.attr('Date', {
        defaultValue: new Date()
    }),
    created: DS.attr('Date', {
        defaultValue: new Date()
    })
});

export default Profile;
