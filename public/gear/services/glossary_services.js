'use strict';

angular.module('dashboard')
    .factory('GlossarySrc', ['$resource', '$http','WcfConfig', function ($http, WcfConfig) {
        return $http('/gear/statics/glossary.json');
    }])
    .factory('AccessFormsSrc', ['$resource', '$http','WcfConfig', function ($http, WcfConfig) {
    return $http('/gear/statics/accessforms.json');
    }]);