import Ember from 'ember';
//import DS from 'ember-data';
import Session from 'simple-auth/session';




export default Session.extend({
  after:'simple-auth',
  currentUser: function(){
    return this.container.lookup('ember_simple_auth:session');
  }.property('currentUser')
});
/*
 *export default Session.extend({
 *  currentUser: function() {
 *    var userId = this.get('secure.userId');
 *    console.log(this.get('session.user'));
 *
 *    if (!Ember.isEmpty(userId)) {
 *      return DS.PromiseObject.create({
 *        promise: this.container.lookup('store:main').find('user', userId)
 *      });
 *    }
 *  }.property('secure.userId')
 *});
 */
