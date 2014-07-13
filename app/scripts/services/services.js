/**
 * @author Bruno Domingues
 */

'use strict';

angular.module('VirtualPTApp')
    .factory('PersonalTrainerService', function ($resource) {
        return $resource('../rest/personalTrainers/:id', {
            id: '@id'
        });
    });

angular.module('VirtualPTApp')
    .factory('ClientService', function ($resource) {
        return $resource(
            '../rest/clients/:id',
            {
                id: '@id'
            },
            {
                update: {
                    method: 'PUT'
                }
            }
        );
    });

angular.module('VirtualPTApp')
    .factory('PtClientAssociationService', function ($resource) {
        return $resource('../rest/ptClientAssociations/:id', {
            id: '@id'
        });
    });

