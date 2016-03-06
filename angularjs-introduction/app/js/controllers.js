'use strict';

/* Controllers */

var appControllers = angular.module('appControllers', []);


appControllers.controller('AppCtrl', ['$rootScope', '$scope', '$window', '$interval',
    function ($rootScope, $scope, $window, $interval) {
        $scope.global = {};
        $scope.back = function () {
            $window.history.back();
        };
        
        $interval(function () {
            $scope.global = {tick: ($scope.global.tick || 0) + 1};
        }, 1000);
    }]);

appControllers.controller('TrainingListCtrl', ['$scope', 'Trainings',
    function ($scope, Trainings) {
        $scope.trainings = Trainings.query();
    }]);

appControllers.controller('TrainingDetailsCtrl', ['$scope', '$routeParams', '$filter', '$q', 'Training', 'Reservations',
    function ($scope, $routeParams, $filter, $q, Training, Reservations) {
        $scope.isReserved = false;
        $scope.isReservedWithErrors = false;
        Training.query({id: $routeParams.id}, function (training) {
            $scope.training = training;
        });

        $scope.makeReservation = function () {
            if ($scope.reservationForm.$valid) {
                Reservations.save($scope.trainee,
                        function (successResponse) {
                            $scope.isReserved = true;
                        },
                        function (errorResponse) {
                            $scope.isReservedWithErrors = true;
                        });
            }
        };

        $scope.isUniqueUserEmail = function (email) {
            if (!email) {
                return $q.when(true);
            }
            return Reservations.query({email: email}).$promise.then(
                    function (successResponse) {
                        if (successResponse.length > 0) {
                            return $q.reject();
                        } else {
                            $q.when(true);
                        }
                    },
                    function (errorResponse) {
                        $q.when(true);
                    });
        };
    }]);