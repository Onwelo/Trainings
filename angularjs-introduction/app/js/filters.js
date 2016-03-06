/* global angular */

'use strict';

/* Filters */

var appFilters = angular.module('appFilters', []);

appFilters.filter('humanizeIsoDuration', function () {
    return function (input) {
        if (input) {
            return moment.duration(input).humanize();
        }
    };
});
