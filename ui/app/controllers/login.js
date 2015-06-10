import Ember from 'ember';

export
default Ember.Controller.extend({
    password: 'password',
    email: 'admin@admin.comm',
    remember: false,
    actions: {
        authenticate() {
            var authenticator = 'simple-auth-authenticator:token';
            var data = this.getProperties('email', 'password', 'remember');

            this.set("loginFailed", false);


            this.get('session').authenticate(authenticator, data).catch((result) => {
                console.log(result);
                console.log("aaaaaaaaaaaaaaaaaaaaAAAA");
                this.set("loginFailed", true);
                throw result;
            });
return false;
        }
    }
});

