/*
RequireJS entry point
 */

requirejs.config({
   baseUrl: 'js/lib',
    paths: {
        'app'                   : '../app',
        'jquery'                : 'jquery-3.1.1.min',
        'underscore'            : 'underscore/underscore-min', // non-AMD
        'backbone'              : 'backbone/backbone-min',
        'backbone.localstorage' : 'backbone/backbone-localstorage-min'},

    shim: {
       'underscore': {
           exports: "_"
       },
        'backbone': {
            deps: ['underscore','jquery'],
            exports: 'Backbone'
        },
        'backbone.localstorage': {
            deps: ['backbone'],
            exports: 'Backbone'
        }
    }
});

console.log('main.js gestart');

require(['domReady!','app/todo'],
    function (doc, todo) {
    todo.start(); // start de app
});