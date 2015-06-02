/* globals i18n */
import Ember from 'ember';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';
import config from './config/environment';
import DS from 'ember-data';

Ember.MODEL_FACTORY_INJECTIONS = true;

var App = Ember.Application.extend({
    modulePrefix: config.modulePrefix,
    podModulePrefix: config.podModulePrefix,
    Resolver: Resolver,
    Store: DS.Store.extend({
        adapter: DS.RESTAdapter
    })
});

loadInitializers(App, config.modulePrefix);

i18n.init({
    'lng': 'en'
});

export default App;
