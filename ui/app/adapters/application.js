import Ember from 'ember';
import DS from 'ember-data';

export
default DS.RESTAdapter.extend({
    host: 'http://localhost:3000',
    namespace: 'api',
    headers: function() {
        var token = this.container.lookup('session:custom').get('secure.token');
        return {
            'authorization': 'Bearer ' + token
        };
    }.property().volatile(),

    findQuery: function(store, type, query) {
        var loopbackQuery = {};

        Ember.$.each(query, (k, v) => {
            loopbackQuery["filter[where][" + k + "]"] = v;
        });

        return this._super(store, type, loopbackQuery);
    }
});

