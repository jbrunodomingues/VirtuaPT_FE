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
            $scope.clients = null;
            $scope.newClient = null;

            $scope.changeSelection = function () {
                $scope.clients = PtClientAssociationService.query(
                    {personalTrainerId: $scope.selectedPersonalTrainer.id},
                    function (ptClientAssociations) {
                        $scope.clients = ptClientAssociations.map(function (ptClientAssociation) {
                            return ptClientAssociation.client;
                        });
                    }
                );
            };

            $scope.save = function (client) {
                ClientService.update(client);
            };

            $scope.remove = function (client) {
                console.log(client);
                PtClientAssociationService.query(
                    {clientId: client.id},
                    function(ptClientAssociations) {
                        PtClientAssociationService.remove(
                            {id: ptClientAssociations[0].id},
                            function () {
                                ClientService.delete(
                                    {id: client.id},
                                    function () {
                                        var indexOf = $scope.clients.indexOf(client);
                                        $scope.clients.splice(indexOf, 1);
                                    }
                                );
                            });
                    }
                );
            };

            $scope.create = function(client) {
                console.log(client);
            };

            $scope.createNew = function() {
                $scope.newClient = new ClientService();
            };
        }
    ]);