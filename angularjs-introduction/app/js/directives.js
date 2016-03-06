/* global angular */

'use strict';

/* Directives */

var appDirectives = angular.module('appDirectives', []);

appDirectives.directive('myNgClick', ['$parse', function ($parse) {
        return {
            compile: function (element, attr) {
                var fn = $parse(attr['myNgClick']);
                return function (scope, element, attr) {
                    element.on('click', function (event) {
                        scope.$apply(function () {
                            fn(scope, {$event: event});
                        });
                    });
                };
            }
        };
    }]);


appDirectives.directive('demoDirective', function () {
    return {
        priority: 0,
        restrict: 'EACM',
        replace: true,
        transclude: true,
        require: '',
        terminal: false,
        template: '<span ng-click="demoAttributeFunction()">{{demoAttributeBinded}} {{global}}</span>',
        scope: {
            demoAttributeBinded: '=',
            demoAttributeString: '@',
            demoAttributeFunction: '&'
        },
        compile: function (element, attr) {
            //console.log('directive compile', arguments);
        },
        link: function (scope, elem, attrs, ctrls) {
            //console.log('directive link', arguments);
        },
        controller: ['$scope', function ($scope) {
                //console.log('directive controler', arguments);
            }]
    };
});

appDirectives.directive('remoteValidator', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            require: ['ngModel', '?^busyIndicator'],
            link: function (scope, elm, attr, ctrls) {
                var expfn = $parse(attr["remoteValidatorFunction"]);
                var validatorName = attr["remoteValidator"];
                var ngModelCtrl = ctrls[0];
                var busyIndicator = ctrls[1];
                ngModelCtrl.$asyncValidators[validatorName] = function (value) {
                    return expfn(scope, {'value': value});
                };
                if (busyIndicator) {
                    scope.$watch(function () {
                        return ngModelCtrl.$pending;
                    }, function (newValue) {
                        if (newValue) {
                            busyIndicator.show();
                        } else {
                            busyIndicator.hide();
                        }
                    });
                }
            }
        };
    }]);


appDirectives.directive('busyIndicator', function () {
    return {
        scope: true,
        transclude: true,
        template: '<div><div ng-transclude=""></div><small><progress ng-show="busy" class="progress progress-striped progress-info progress-animated" value="50" max="100">50%</progress></small></div>',
        controller: ['$scope', function ($scope) {
                this.show = function () {
                    $scope.busy = true;
                };
                this.hide = function () {
                    $scope.busy = false;
                };
            }]
    };
});