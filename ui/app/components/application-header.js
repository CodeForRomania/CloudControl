import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'header',
    classNames: ['main-header'],
    actions: {
        invalidateSession: function() {
            this.get('session').invalidate();
        }
    }
});
