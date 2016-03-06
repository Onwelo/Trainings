'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('Angular App', function () {
    
    it('should redirect index.html', function () {
        browser.get('index.html?e2e');
        browser.getLocationAbsUrl().then(function (url) {
            expect(url).toBe('/index');
        });
    });


    describe('TrainingList view', function () {

        beforeEach(function () {
            browser.get('index.html#/index?e2e');
        });


        it('it should filter trainings', function () {

            var trainingList = element.all(by.repeater('training in trainings'));
            var query = element(by.model('filter.title'));

            expect(trainingList.count()).toBe(2);

            query.sendKeys('Angular');
            expect(trainingList.count()).toBe(1);

            query.clear();
            query.sendKeys('Spring');
            expect(trainingList.count()).toBe(1);
        });

        xit('should redirect to  training detailed view', function () {

            element.all(by.repeater('training in trainings')).first().click();

            browser.getLocationAbsUrl().then(function (url) {
                expect(url).toEqual('/training/1');
            });
        });

    });
    
    
    
  describe('TrainingDetail view', function() {

    beforeEach(function() {
      browser.get('index.html#/training/1?e2e');
    });


    xit('should display Angular page', function() {
      expect(element(by.binding('training.title')).getText()).toBe('Angular JS - Wprowadzenie');
    });
  });

});
