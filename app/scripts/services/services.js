/**
 * @author Bruno Domingues
 */

'use strict';

var domain = 'http://localhost:8080';

angular.module('VirtualPTApp')
    .factory('PersonalTrainerService', function ($resource) {
        return $resource(domain +'/rest/personalTrainers/:id', {
            id: '@id'
        });
    });

angular.module('VirtualPTApp')
    .factory('ClientService', function ($resource) {
        return $resource(
                domain +'/rest/clients/:id',
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
        return $resource(domain +'/rest/ptClientAssociations/:id', {
            id: '@id'
        });
    });

