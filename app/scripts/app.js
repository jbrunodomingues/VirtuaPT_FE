/**
 * @ngdoc overview
 * @name VirtualPTApp
 * @description
 * # VirtualPTApp
 *
 * Main module of the application.
 */
'use strict';
angular
    .module('VirtualPTApp', [
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ui.bootstrap',
        'ngTable'
    ])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .when('/about', {
                templateUrl: 'views/about.html',
                controller: 'AboutCtrl'
            })
            .when('/management', {
                templateUrl: 'views/management.html',
                controller: 'ManagementController'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
