'use strict';

angular.module('dashboard')
    .factory('SearchSrc', ['$resource', 'WcfConfig', function ($resource, WcfConfig) {
        return $resource('/api/v0/search/:kw');
    }])