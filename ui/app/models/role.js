import DS from 'ember-data';

var Role = DS.Model.extent({
    name: DS.attr('String'),
    created: DS.attr('Date', {
        defaultValue: new Date()
    })
});
export default Role;
