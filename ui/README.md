# ember-admin-dashboard
This project's goals:
* "Emberize" the very awesome [AdminLTE template](https://github.com/almasaeed2010/AdminLTE) including Ember-Cli.
* Show a demo implementation of a realtime dashboard pulling data from the twitter stream api with socket.io
* 1 click deploy to Heroku (will work with github forks and clones as well):

    [![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

![tweet-dashboard](https://cloud.githubusercontent.com/assets/3126207/6563376/60659760-c6a9-11e4-9e5d-16e3fc11841b.gif)

I will expose this project first at my upcoming talk in [Reversim Summit 2015](http://summit2015.reversim.com/proposal/4eTos8T9QfgZhrLYP)


## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Ember CLI](http://www.ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

## Installation

* `git clone <repository-url>` this repository
* change into the new directory
* `npm install`
* `bower install`

## Running / Development

* `ember server`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

## Further Reading / Useful Links

* [ember.js](http://emberjs.com/)
* [ember-cli](http://www.ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)



## Additions:
    * i18next.js via bower is register as a helper in /app/helpers/t-tr.js which is loaded automatically and it loads the languages from /public/locales/__lng__. 
