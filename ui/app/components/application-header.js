import Ember from 'ember';
import Session from "simple-auth/session";

export default Ember.Component.extend({
    tagName: 'header',
    classNames: ['main-header'],
    actions: {
        invalidateSession: function() {
            this.get('session').invalidate();
        }
    }
});
