import Ember from 'ember';
import DS from 'ember-data';
import Session from 'simple-auth/session';

export default Session.extend({
  currentUser: function() {
    var userId = this.get('secure.userId');

    if (!Ember.isEmpty(userId)) {
      return DS.PromiseObject.create({
        promise: this.container.lookup('store:main').find('user', userId)
      });
    }
  }.property('secure.userId')
});
