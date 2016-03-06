'use strict';

/* jasmine specs for controllers go here */
describe('App controllers', function() {

  beforeEach(function(){
    this.addMatchers({
      toEqualData: function(expected) {
        return angular.equals(this.actual, expected);
      }
    });
  });

  beforeEach(module('trainingApp'));
  beforeEach(module('appServices'));

  describe('TrainingListCtrl', function(){
    var scope, ctrl;

    beforeEach(inject(function($rootScope, $controller) {
      scope = $rootScope.$new();
      ctrl = $controller('TrainingListCtrl', {$scope: scope});
    }));


    it('should init trainings', function() {
      expect(scope.trainings).toEqualData([]);
    });
  });

});
