/**
 * @author Bruno Domingues
 */

'use strict';

angular.module('VirtualPTApp')
    .factory('ManagementService', function ($resource) {
        return $resource('http://localhost:8080/rest/personalTrainers/:id', {
            id: '@id'
        });
    });