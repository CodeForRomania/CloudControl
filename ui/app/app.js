/* globals i18n */
import Ember from 'ember';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';
import config from './config/environment';

Ember.MODEL_FACTORY_INJECTIONS = true;
Ember.deprecate = function() {};
var App = Ember.Application.extend({
    modulePrefix: config.modulePrefix,
    podModulePrefix: config.podModulePrefix,
    Resolver: Resolver
});

loadInitializers(App, config.modulePrefix);

i18n.init({
    'lng': 'en'
});

export default App;
