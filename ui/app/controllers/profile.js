import Ember from 'ember';

export
default Ember.Controller.extend({
    email: '',
    password: '',
    password1: '',

    init: function() {
        var _this = this;
        this.get('session.currentUser')
            .then(function(r) {
                var email = r.get('email');
                _this.set('email', email);
            });
    },
    actions: {
        updateProfile () {
            console.log('UpdateProfile');
            var data = this.getProperties('email', 'password', 'password1');
            if(data.password !== data.password1) {
            }
console.log(data);
        return false;
        },
        updateProfileAvatar  () {
            console.log('update profile avatar');
        }
    }

});

