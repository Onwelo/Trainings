/* global angular */

'use strict';

/* Services */

var appServices = angular.module('appServices', ['ngResource', 'appConfig']);

appServices.factory('Trainings', ['$resource', 'appConfig',
    function ($resource, appConfig) {
        return $resource(appConfig.API_URL + '/trainings', {}, {
            query: {method: 'GET', isArray: true}
        });
    }]);

appServices.factory('Training', ['$resource', 'appConfig',
    function ($resource, appConfig) {
        return $resource(appConfig.API_URL + '/trainings/:id', {id:'@id'}, {
            query: {method: 'GET', isObject: true}
        });
    }]);

appServices.factory('Reservations', ['$resource', 'appConfig',
    function ($resource, appConfig) {
        return $resource(appConfig.API_URL + '/reservations', {}, {
            query: {method: 'GET', isArray: true}
        });
    }]);