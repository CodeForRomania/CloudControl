import DS from 'ember-data';

export default DS.Model.extend({
    email: DS.attr('String'),
    name: DS.attr('String'),
    created: ddDS.attr('Date'),
});

