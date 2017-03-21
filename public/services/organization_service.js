/* eslint-disable */

'use strict';

// UNUSED, LEGACY
// Delete reference in BusinessController and this is good to be removed

angular.module('dashboard').factory('OrgSvc', ['$http', 'WcfConfig',function ($http, WcfConfig) {
    var endpoint = WcfConfig.urlRoot + 'EAOpen.svc/organizations';
    var req = $http.get(endpoint, {
        cache: true
    });
    var dataset = null;

    req.success(function (res) {
        dataset = res.data;
    });

    function getDisplayName (name) {
        if (dataset) {
            return dataset;
        } else {
            return req;
        }
    }

    return {
        getDisplayName: getDisplayName
    }
}]);
