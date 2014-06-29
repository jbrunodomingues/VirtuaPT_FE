/**
 * @author Bruno Domingues
 */
'use strict';

angular.module('VirtualPTApp')
    .controller('ManagementController', ['$scope', 'ManagementService',
        function ($scope, ManagementService) {
            $scope.personalTrainers = ManagementService.query();
            $scope.selectedPersonalTrainer = null;
            $scope.headers = ['First Name', 'Last Name'];
        }]);