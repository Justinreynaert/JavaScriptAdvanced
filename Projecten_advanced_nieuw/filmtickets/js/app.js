requirejs.config({
    baseUrl: 'js/lib',
    paths: {
        app: '../app',
        jquery: 'jquery-3.1.1.min',
        lodash: 'lodash',
        ldsh: 'loader'
    },
    lodashLoader: {
        ext: '.tpl',
        root: '../../js/tpl',
        templateSettings: {}
    }
});

console.log('app.js bezig');

// start de app - LANGE VERSIE

/*require(['domReady','jquery','app/tickets'], function($, tickets) {
        domReady( function() {
            $('#test').html('hallo mijn app hier');

            $('#ticketKopen').append(tickets.koopModule());
        })

});*/

//start de app - SHORT VERSION

require(['domReady!', 'jquery','app/tickets'],
function (doc, $, tickets) {
    $('#test').html('hallo mijn app hier');
    $('#ticketKopen').append(tickets.koopModule());
});