'use strict';

// Setting up route
angular.module('mean').config(['$routeProvider',
    function($routeProvider) {
        // Application routing definition
        $routeProvider.
        when('/', {
            templateUrl: 'views/index.html',
            css: 'views/static/index.css',
            controller: 'AuthenticationController'
        }).
        when('/dashboard', {
            templateUrl: 'views/dashboard.html',
            css: 'views/static/dashboard.css',
            controller: 'AuthenticationController'
        }).
        when('/send_text', {
            controller: 'AuthenticationController'
        }).
        otherwise({
            redirectTo: '/'
        });
    }
]);