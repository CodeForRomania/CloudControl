import Ember from 'ember';

export
default Ember.Controller.extend({
    password: 'password',
    identification: 'admin@admin.com',
    remember: false,
    /*    rememberMe: false,
        // change the store's cookie expiration time depending on whether "remember me" is checked or not
        rememberMeChanged: function() {
            this.get('session.store').cookieExpirationTime = this.get('rememberMe') ? 1209600 : null;
        }.observes('rememberMe'),
    */
    actions: {
        authenticate() {
            var authenticator = 'simple-auth-authenticator:jwt';
            var data = this.getProperties('identification', 'password');
            this.set('loginFailed', false);

        debugger;
           return this.get('session').authenticate(authenticator, data)
                .catch((result) => {
                    this.set('loginFailedMessage', result);
                    this.set('loginFailed', true);
                    throw result;
                });
        }
    }
});

