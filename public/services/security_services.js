// Invoke 'strict' JavaScript mode
'use strict';

// Create the 'FISMA' service
angular.module('dashboard').factory('FISMA', ['$resource', 'WcfConfig', function ($resource, WcfConfig) {
    // Use the '$resource' service to return an FISMA System '$resource' object
    return $resource(WcfConfig.urlRoot + 'EAOpen.svc/fisma_systems/', {
        fismaId: '@_id'
    });
}]);

// Create the 'FISMA POC' service
angular.module('dashboard').factory('FISMAPOC', ['$resource', 'WcfConfig', function ($resource, WcfConfig) {
    // Use the '$resource' service to return an FISMA System '$resource' object
    return $resource(WcfConfig.urlRoot + 'EAOpen.svc/fisma_systems/', {
        fismaId: '@_id'
    });
}]);

// Create the 'RISSO' service
angular.module('dashboard').factory('RISSO', ['$resource', 'WcfConfig', function ($resource, WcfConfig) {
    // Use the '$resource' service to return an FISMA System '$resource' object
    return $resource(WcfConfig.urlRoot + 'EAOpen.svc/risso_pocs:rissoId', {
        rissoId: '@_id'
    });
}]);
