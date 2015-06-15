import Ember from 'ember';
import DS from 'ember-data';
import Session from 'simple-auth/session';
import jwt from 'simple-auth-token/authenticators/jwt';


export default  Session.extend({
    currentUser: function() {
console.log(jwt);
        var token = 0;//this.get('secure.token');

        if (!Ember.isEmpty(token)) {
            return DS.PromiseObject.create({
                promise: this.container.lookup('store:main').find('user', token)
            });
        }
    }.property('secure.token')
});

