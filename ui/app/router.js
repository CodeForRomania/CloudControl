import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
    location: config.locationType
});

export
default Router.map(function() {
    this.route('index', {
        path: '/'
    });

    this.route('logs');
    this.route('widgets');
    this.route('twitter');
    this.route('general-ui');
    this.route('comingsoon');
    this.route('ui-icons');
    this.route('ui-buttons');
    this.route('ui-timeline');
    this.route('ui-modals');

    this.resource('settings', function() {
        this.route('amazon');
        this.route('azure');
        this.route('digitalOcean');
        this.route('hp');
        this.route('joyent');
        this.route('openstack');
        this.route('rackspace');
    });
    this.resource('tools', function() {
        this.route('index');
    });

    this.resource('users', function() {
        this.route('list');
        this.route('roles');
        this.route('groups');
    });

});

