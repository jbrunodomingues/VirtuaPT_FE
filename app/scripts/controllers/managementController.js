/**
 * @author Bruno Domingues
 */
'use strict';

var ModalInstanceCtrl = function ($scope, $modalInstance) {
    $scope.client = {};

    $scope.create = function () {
        $modalInstance.close($scope.client);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
};

angular.module('VirtualPTApp')
    .controller('ManagementController', [
        '$scope',
        '$modal',
        'PersonalTrainerService',
        'ClientService',
        'PtClientAssociationService',
        'ngTableParams',
        function ($scope, $modal, PersonalTrainerService, ClientService, PtClientAssociationService, ngTableParams) {
            PersonalTrainerService.query().$promise.then(function (result) {
                $scope.personalTrainers = result;
            });
            $scope.selectedPersonalTrainer = null;
            $scope.clients = null;

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
                PtClientAssociationService.query(
                    {clientId: client.id},
                    function (ptClientAssociations) {
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

            $scope.create = function (client) {
                ClientService.save(client, function (createdClient) {
                    var ptClientAssociation = {};
                    ptClientAssociation.client = createdClient;
                    ptClientAssociation.personalTrainer = $scope.selectedPersonalTrainer;
                    PtClientAssociationService.save(ptClientAssociation, function () {
                        $scope.clients = PtClientAssociationService.query(
                            {personalTrainerId: $scope.selectedPersonalTrainer.id},
                            function (ptClientAssociations) {
                                $scope.clients = ptClientAssociations.map(function (ptClientAssociation) {
                                    return ptClientAssociation.client;
                                });
                            }
                        );
                    });
                });
            };

            $scope.createNew = function () {
                var modalInstance = $modal.open({
                    templateUrl: 'myModalContent.html',
                    controller: ModalInstanceCtrl,
                    size: 'sm'
                });
                modalInstance.result.then(function (client) {
                    $scope.create(client);
                });
            };

        }
    ]);