/* global angular */

'use strict';

/* App Module */

var trainingApp = angular.module('trainingApp', [
    'ngRoute',
    'ngResource',
    'appControllers',
    'appFilters',
    'appServices',
    'appDirectives',
    'appConfig'
]);

trainingApp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
                when('/index', {
                    templateUrl: 'partials/index.html',
                    controller: 'TrainingListCtrl'
                }).
                when('/training/:id', {
                    templateUrl: 'partials/training/id.html',
                    controller: 'TrainingDetailsCtrl'
                }).
                otherwise({
                    redirectTo: '/index'
                });
    }]);

trainingApp.value('someValue', {uCanChangeMe: true});
trainingApp.constant('someConstant', {uCanChangeMe: false});

trainingApp.run(['$location', 'appConfig',
    function ($location, appConfig) {
        if ($location.search().e2e) {
            appConfig.API_URL = "http://127.0.0.1:8000/api";
        }
    }
]);