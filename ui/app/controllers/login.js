import Ember from 'ember';

export
default Ember.Controller.extend({
    password: 'password',
    identification: 'admin@admin.com',
    remember: false,
    actions: {
        authenticate() {
            var authenticator = 'simple-auth-authenticator:token';
            var data = this.getProperties('identification', 'password');
            this.set('loginFailed', false);

            return this.get('session').authenticate(authenticator, data).catch((result) => {
                this.set('loginFailedMessage', result);
                this.set('loginFailed', true);
                throw result;
            });
        }
    }
});

