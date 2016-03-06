'use strict';

/* jasmine specs for filters go here */

describe('filter', function() {

  beforeEach(module('appFilters'));


  describe('humanizeIsoDuration', function() {

    it('should convert IS08601 duration string to humanized version in polsh locale',
        inject(function(humanizeIsoDurationFilter) {
          expect(humanizeIsoDurationFilter('PT8H')).toBe('8 godzin');
          expect(humanizeIsoDurationFilter('P5D')).toBe('5 dni');
    }));
  });
});
