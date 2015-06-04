import Ember from 'ember';
import DS from 'ember-data';

export
default DS.RESTAdapter.extend({
    host: 'http://localhost:3000',
    namespace: 'api',

    findQuery: function(store, type, query) {
        var loopbackQuery = {};

        Ember.$.each(query, (k, v) => {
            loopbackQuery["filter[where][" + k + "]"] = v;
        });

        return this._super(store, type, loopbackQuery);
    }
});

