import Ember from 'ember';

export default Ember.Route.extend({
    model: function() {
            console.log(this.store.find('user'));
            return this.store.find('user');
    }
});

