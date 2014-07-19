'use strict';

describe('ManagementController', function () {
    var managementController,
        $scope,
        $q,
        mockPersonalTrainerService,
        mockPersonalTrainerServiceResponse,
        queryDeferred,
        $rootScope;

    mockPersonalTrainerServiceResponse = [
        {
            id: 1,
            firstName: 'John',
            lastName: 'Dow'
        },
        {
            id: 1,
            firstName: 'Anne',
            lastName: 'Fit'
        }
    ];

    beforeEach(module('VirtualPTApp'));

    beforeEach(inject(function(_$q_, _$rootScope_) {
        $q = _$q_;
        $rootScope = _$rootScope_;
    }));

    beforeEach(inject(function($controller) {
        $scope = $rootScope.$new();

        mockPersonalTrainerService = {
            query: function () {
                queryDeferred = $q.defer();
                return {$promise: queryDeferred.promise};
            }
        };

        spyOn(mockPersonalTrainerService, 'query').andCallThrough();

        managementController = $controller('ManagementController', {
                $scope: $scope,
                'PersonalTrainerService': mockPersonalTrainerService
            }
        );
    }));

    describe('constructor', function() {

        beforeEach(function() {
            queryDeferred.resolve(mockPersonalTrainerServiceResponse);
            $scope.$apply();
        });

        it('should query the personalTrainerService', function() {
            expect(mockPersonalTrainerService.query).toHaveBeenCalled();
        });

        it('should set the response from the personalTrainerService to $scope.personalTrainers', function() {
            expect(mockPersonalTrainerServiceResponse).toEqual($scope.personalTrainers);
        });
    });

});