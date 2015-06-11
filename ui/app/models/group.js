import DS from 'ember-data';

var Group = DS.Model.extend({
    name: DS.attr('String'),
    user: DS.belongsTo('user'),
    created: DS.attr('Date', {
        defaultValue: new Date()
    })
});
export default Group;
