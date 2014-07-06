/**
 * @author Bruno Domingues
 */
'use strict';

angular.module('VirtualPTApp')
    .controller('ManagementController', [
        '$scope',
        'PersonalTrainerService',
        'ClientService',
        'PtClientAssociationService',
        'ngTableParams',
        function ($scope, PersonalTrainerService, ClientService, PtClientAssociationService, ngTableParams) {
            $scope.personalTrainers = PersonalTrainerService.query();
            $scope.selectedPersonalTrainer = null;

            $scope.changeSelection = function () {
                var ptClientAssociations = PtClientAssociationService.query({personalTrainerId: $scope.selectedPersonalTrainer.id})
                var clients = [];
                for(var i = 0; i < ptClientAssociations.length; i++) {
                    clients.push(ptClientAssociations[i].client);
                }
                $scope.clients = clients;
//                $scope.clients = $scope.selectedPersonalTrainer.clients;
            };

            $scope.save = function (client) {
                var newClient = {
                    firstName: 'Testing',
                    lastName: 'Stuff'
                };
                ClientService.save(newClient)
//                ClientService.update(client);
            };

            $scope.remove = function (client) {
                ClientService.delete({id: client.id});
            };
        }
    ]);