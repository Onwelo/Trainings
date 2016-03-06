/* global angular */

'use strict';

var appConfig = angular.module('appConfig', []);

appConfig.provider('appConfig', function () {
    var config = {
        ENV_DEV: true,
        API_URL: 'http://localhost:2403'
    };
    return {
        set: function (settings) {
            angular.extend(config, settings);
        },
        $get: function () {
            return config;
        }
    };
});
