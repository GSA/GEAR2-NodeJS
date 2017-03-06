// Invoke 'strict' JavaScript mode
'use strict';

// Create the 'Investment' service
angular.module('dashboard').factory('Investment', ['$resource', 'WcfConfig', function ($resource, WcfConfig) {
    // Use the '$resource' service to return a Goal '$resource' object
    return $resource(WcfConfig.urlRoot + 'EAOpen.svc/investments:investmentName', {
        investmentName: '@Name'
    });
}]);

// Create the 'Goal' service
angular.module('dashboard').factory('Goal', ['$resource', 'WcfConfig', function ($resource, WcfConfig) {
    // Use the '$resource' service to return a Goal '$resource' object
    return $resource(WcfConfig.urlRoot + 'EAOpen.svc/goals:goalId', {
        goalId: '@_id'
    });
}]);
