'use strict';

describe('service', function () {

    // load modules
    beforeEach(module('trainingApp'));

    // Test service availability
    it('check the existence of Trainings factory', inject(function (Trainings) {
        expect(Trainings).toBeDefined();
    }));

    describe("Trainings resource service", function () {
        var TrainingResource, TrainingsResource, $httpBackend;
        var apiURL = 'http://localhost:2403';

        beforeEach(inject(function (_Training_, _Trainings_,_$httpBackend_) {
            TrainingResource = _Training_;
            TrainingsResource = _Trainings_;
            $httpBackend = _$httpBackend_;
        }));

        afterEach(function () {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        it('check if response gonna be send to endpoint', function () {
            $httpBackend.expectGET(apiURL + "/trainings").respond([]);
            TrainingsResource.query();
            $httpBackend.flush();
        });

        it('check if response return trainings by title', inject(function ($q) {
            var result = null;

//            spyOn(TrainingResource, "query").andReturn(
//                    {$promise: $q.when([{title: "Angular"}])}
//            );

            $httpBackend.expectGET(apiURL + "/trainings/1").respond({title: "Angular"});

            TrainingResource.query({id: 1}).$promise.then(function (trainings) {
                result = trainings;
            });
            
            
            $httpBackend.flush();

            expect(result.title).toBe("Angular");

        }));


    });
});