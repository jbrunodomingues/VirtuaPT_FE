'use strict';

/**
 * @ngdoc function
 * @name VirtualPTApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the VirtualPTApp
 */
angular.module('VirtualPTApp')
    .controller('AboutCtrl', function ($scope) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];
    });
