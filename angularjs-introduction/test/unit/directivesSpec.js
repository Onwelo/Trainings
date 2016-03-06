'use strict';

/* jasmine specs for directives go here */

describe('directives', function () {
    var $compile, $rootScope, $scope;

    beforeEach(module('appServices'));

    beforeEach(inject(function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
    }));


    describe('Directive remote-validator', function () {
        var inputElement;

        beforeEach(inject(function () {
            $scope.validate = function (value) {};
            inputElement = '<form name="testForm"><input type="text" name="unique" ng-model="name" remote-validator="unique" remote-validator-function="validate(value)"></form>';
        }));

        xit('should check uniqnees after field value change', inject(function ($q) {
            spyOn($scope, "validate").andReturn($q.when(true));
            $compile(inputElement)($scope);
            $scope.testForm.unique.$setViewValue("dummy");

            expect($scope.name).toBe("dummy");
            expect($scope.validate).toHaveBeenCalled();
        }));

        xit('should write error in model controller', inject(function ($q) {
            spyOn($scope, "validate").andReturn($q.reject());
            $compile(inputElement)($scope);
            $scope.testForm.unique.$setViewValue("dummy");
            expect($scope.validate).toHaveBeenCalled();
            
            $scope.$digest();

            expect($scope.name).toBe("dummy");
            expect($scope.testForm.unique.$valid).toBe(false);
            expect($scope.testForm.unique.$error.unique).toBe(true);
        }));
    });
});
