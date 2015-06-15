import DS from 'ember-data';


var AuthKey = DS.Model.extend({
    access_token: DS.attr('string'),
    user: DS.belongsTo('user', {
        async: true
    })
});

export default AuthKey;

