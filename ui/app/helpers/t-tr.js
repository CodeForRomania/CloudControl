/* global i18n */
// this helper loads automatically and deals with translation

// translate simple keys
import Ember from 'ember';

export default Ember.Handlebars.makeBoundHelper(function(i18n_key, options) {
    var result;

    if (typeof i18n_key !== "string") {
        var opts = i18n.functions.extend(options.hash, i18n_key);
        if (options.fn) {
            opts.defaultValue = options.fn(i18n_key);
        }

        result = i18n.t(opts.key, opts);
    } else {
        result = i18n.t(i18n_key);
    }
    return new Ember.Handlebars.SafeString(result);
});
