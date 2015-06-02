/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp();

// Use `app.import` to add additional libraries to the generated
// output files.
//
// If you need to use different assets in different
// environments, specify an object as the first parameter. That
// object's keys should be the environment name and the values
// should be the asset to use in that environment.
//
// If the library that you are including contains AMD or ES6
// modules that you would like to import into your application
// please specify an object with the list of modules as keys
// along with the exports of each module as its value.


/*****************************
***    Admin LTE Styles
******************************/
var AdminLTE_PATH = "bower_components/adminlte";
var BOWER_COMPONENT_PATH = "bower_components";
 
// Bootstrap 3.3.2
app.import( AdminLTE_PATH + '/bootstrap/css/bootstrap.min.css');
// FontAwesome 4.3.0
// app.import( AdminLTE_PATH + '/plugins/font-awesome/font-awesome.min.css');
// Ionicons 2.0.0
// app.import( AdminLTE_PATH + '/plugins/ionicons/ionicons.min.css');
// morris chart
app.import( AdminLTE_PATH + '/plugins/morris/morris.css');
// jvector map
app.import( AdminLTE_PATH + '/plugins/jvectormap/jquery-jvectormap-1.2.2.css');
// Date Picker
app.import( AdminLTE_PATH + '/plugins/datepicker/datepicker3.css');
// Daterange picker
app.import( AdminLTE_PATH + '/plugins/daterangepicker/daterangepicker-bs3.css');
// bootstrap wysihtml5 - text editor
app.import( AdminLTE_PATH + '/plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.min.css');
// Theme style
app.import( AdminLTE_PATH + '/dist/css/AdminLTE.min.css');
// AdminLTE Skins. Choose a skin from the css/skins folder instead of downloading all of them to reduce the load. -->
app.import( AdminLTE_PATH + '/dist/css/skins/_all-skins.min.css');
// icheck
app.import( AdminLTE_PATH + '/plugins/iCheck/flat/blue.css');


/*****************************
***    Admin LTE Scripts
******************************/
// Admin LTE uses JQ 2.1.3 , Ember CLI uses 1.11.2 for now.

// Bootstrap 3.3.2 JS
app.import( AdminLTE_PATH + '/bootstrap/js/bootstrap.min.js');

// jQuery UI 1.11.4
app.import( BOWER_COMPONENT_PATH + '/jquery-ui/jquery-ui.min.js');

// raphael/2.1.0
// app.import( AdminLTE_PATH + '/plugins/raphael/raphael-min.js');

//  Morris.js charts
app.import( AdminLTE_PATH + '/plugins/morris/morris.min.js');

//  Sparkline charts
app.import( AdminLTE_PATH + '/plugins/sparkline/jquery.sparkline.min.js');

//  jvectormap charts
app.import( AdminLTE_PATH + '/plugins/jvectormap/jquery-jvectormap-1.2.2.min.js');

//  jvectormap charts
app.import( AdminLTE_PATH + '/plugins/jvectormap/jquery-jvectormap-world-mill-en.js');

//  jqueryKnob charts
app.import( BOWER_COMPONENT_PATH + '/jquery-knob/dist/jquery.knob.min.js');

//  daterangepicker
app.import( AdminLTE_PATH + '/plugins/daterangepicker/daterangepicker.js');

//  datepicker
app.import( AdminLTE_PATH + '/plugins/datepicker/bootstrap-datepicker.js');

//  Bootstrap WYSIHTML5
app.import( AdminLTE_PATH + '/plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.all.min.js');

//  iCheck
app.import( AdminLTE_PATH + '/plugins/iCheck/icheck.min.js');

//  Slimscroll
app.import( AdminLTE_PATH + '/plugins/slimScroll/jquery.slimscroll.min.js');

//  FastClick
// app.import( AdminLTE_PATH + '/plugins/fastclick/fastclick.min.js');

// I18next plugin
app.import( BOWER_COMPONENT_PATH + '/i18next/i18next.min.js');

//  Custom stuff:
app.import('vendor/socket.io/socket.io.min.js');


module.exports = app.toTree();
