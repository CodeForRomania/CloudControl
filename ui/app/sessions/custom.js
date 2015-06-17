import Ember from 'ember';
import DS from 'ember-data';
import Session from 'simple-auth/session';

export
default Session.extend({
    currentUser: function() {
        var token = this.get('secure.token'),
            user_id = this.get('secure.user_id');

        if (!Ember.isEmpty(token)) {
            return DS.PromiseObject.create({
                promise: this.container.lookup('store:main').find('user', user_id)
            });
        }
    }.property('secure.token')
});

