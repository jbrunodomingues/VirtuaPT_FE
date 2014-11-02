/**
 * @author Bruno Domingues
 */

'use strict';

angular.module('VirtualPTApp')
    .factory('PersonalTrainerService', function ($resource) {
        return $resource(restEndPoint +'/personalTrainers/:id', {
            id: '@id'
        });
    });

angular.module('VirtualPTApp')
    .factory('ClientService', function ($resource) {
        return $resource(
                restEndPoint +'/clients/:id',
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
        return $resource(restEndPoint +'/ptClientAssociations/:id', {
            id: '@id'
        });
    });

