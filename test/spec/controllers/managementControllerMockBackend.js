/**
 * @author Bruno Domingues
 */
'use strict';

describe('controllers', function () {

    var mockBackend;
    var $scope;
    var $controller;
    var personalTrainers;

    beforeEach(function () {
        module('VirtualPTApp');
        inject(function (_$httpBackend_, _$rootScope_, _$controller_) {
            mockBackend = _$httpBackend_;
            $controller = _$controller_;
            $scope = _$rootScope_.$new();
        });
        personalTrainers = createPersonalTrainers();
        mockBackend.whenGET('../rest/personalTrainers', {'Accept': 'application/json, text/plain, */*'}).
            respond(personalTrainers);
    });

    it('should populate with personal trainers',
        inject(function (PersonalTrainerService) {
                //given before configuration

                //when
                $controller('ManagementController',
                    {
                        $scope: $scope,
                        PersonalTrainerService: PersonalTrainerService
                    }
                );
                mockBackend.flush();

                //then
                expect($scope.personalTrainers.length).toEqual(2);
            }
        )
    );

    it('should get personalTrainer clients',
        inject(function (PersonalTrainerService, PtClientAssociationService) {
            //given
            var ptClientAssociations = createPtClientAssociations();
            mockBackend.whenGET('../rest/ptClientAssociations?personalTrainerId=1', {'Accept': 'application/json, text/plain, */*'})
                .respond(ptClientAssociations);

            $controller('ManagementController',
                {
                    $scope: $scope,
                    PersonalTrainerService: PersonalTrainerService,
                    PtClientAssociationService: PtClientAssociationService
                }
            );

            $scope.selectedPersonalTrainer = personalTrainers[0];

            //when
            $scope.changeSelection();
            mockBackend.flush();

            //then
            expect($scope.clients.length).toEqual(2);
        })
    );

    it('should save client changes',
        inject(function (PersonalTrainerService, ClientService) {
            //given
            var client = createClient();

            mockBackend.expectPUT('../rest/clients/1', client)
                .respond(client);

            $controller('ManagementController',
                {
                    $scope: $scope,
                    PersonalTrainerService: PersonalTrainerService,
                    ClientService: ClientService
                }
            );

            //when
            $scope.save(client);
            mockBackend.flush();

            //then expect call to be made
        })
    );

    it('should create client and association',
        inject(function (PersonalTrainerService, ClientService, PtClientAssociationService) {
            //given
            var newClient = createNewClient();
            var client = createClient();
            mockBackend.expectPOST('../rest/clients', newClient)
                .respond(client);

            var ptClientAssociation = createNewPtClientAssociation();
            mockBackend.whenPOST('../rest/ptClientAssociations', ptClientAssociation)
                .respond(ptClientAssociation);

            var ptClientAssociations = createPtClientAssociations();
            mockBackend.expectGET('../rest/ptClientAssociations?personalTrainerId=1')
                .respond(ptClientAssociations);

            $controller('ManagementController',
                {
                    $scope: $scope,
                    PersonalTrainerService: PersonalTrainerService,
                    ClientService: ClientService,
                    PtClientAssociationService: PtClientAssociationService
                }
            );

            $scope.selectedPersonalTrainer = personalTrainers[0];
            //when
            $scope.create(newClient);
            mockBackend.flush();
            //then
            expect($scope.clients.length).toEqual(2);
        })
    );

    it('should remove client and association',
        inject(function (PersonalTrainerService, ClientService, PtClientAssociationService) {
            var client = createClient();
            var ptClientAssociations = [createPtClientAssociations()[0]];
            mockBackend.whenGET('../rest/ptClientAssociations?clientId=1')
                .respond(ptClientAssociations);
            mockBackend.expectDELETE('../rest/ptClientAssociations/1')
                .respond({});
            mockBackend.expectDELETE('../rest/clients/1')
                .respond({});

            $controller('ManagementController',
                {
                    $scope: $scope,
                    PersonalTrainerService: PersonalTrainerService,
                    ClientService: ClientService,
                    PtClientAssociationService: PtClientAssociationService
                }
            );
            $scope.selectedPersonalTrainer = personalTrainers[0];
            $scope.clients = createClients();

            //when
            $scope.remove(client);
            mockBackend.flush();

            //then
            expect($scope.clients.length).toEqual(1);
        })
    );


    //helper methods
    var createPersonalTrainers = function () {
        return [
            {
                id: 1,
                firstName: 'John',
                lastName: 'Doe'
            },
            {
                id: 2,
                firstName: 'Lois',
                lastName: 'Fart'
            }
        ];
    };

    var createNewPtClientAssociation = function() {
        return {
            personalTrainer: {
                id: 1,
                firstName: 'John',
                lastName: 'Doe'
            },
            client: {
                id: 1,
                firstName: 'Fat',
                lastName: 'Joe'
            }
        };
    };

    var createPtClientAssociations = function () {
        return [
            {
                id:1,
                personalTrainer: {
                    id: 1,
                    firstName: 'John',
                    lastName: 'Doe'
                },
                client: {
                    id: 1,
                    firstName: 'Fat',
                    lastName: 'Joe'
                }
            },
            {
                id: 2,
                personalTrainer: {
                    id: 1,
                    firstName: 'John',
                    lastName: 'Doe'
                },
                client: {
                    id: 2,
                    firstName: 'Mc',
                    lastName: 'Fatty'
                }
            }
        ];
    };

    var createClients = function () {
        return [
            {
                id: 1,
                firstName: 'Fat',
                lastName: 'Joe'
            },
            {
                id: 2,
                firstName: 'Mc',
                lastName: 'Fatty'
            }
        ];
    };

    var createClient = function () {
        return {
            id: 1,
            firstName: 'Fat',
            lastName: 'Joe'
        };
    };

    var createNewClient = function () {
        return {
            firstName: 'Fat',
            lastName: 'Joe'
        };
    };
});
