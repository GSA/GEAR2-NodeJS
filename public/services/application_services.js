// Invoke 'strict' JavaScript mode
'use strict';

angular.module('dashboard')
.factory('ApplicationsSrc', ['$resource', 'WcfConfig', function ($resource, WcfConfig) {
    return $resource('/api/v0/applications/:id');
}])
.factory('AppCapabilitiesSrc', ['$resource', 'WcfConfig', function ($resource, WcfConfig) {
    return $resource('/api/v0/applications/:id/capabilities');
}])
.factory('AppTechnologiesSrc', ['$resource', 'WcfConfig', function ($resource, WcfConfig) {
    return $resource('/api/v0/applications/:id/technologies');
}])
.factory('AppPOCsSrc', ['$resource', 'WcfConfig', function ($resource, WcfConfig) {
    return $resource('/api/v0/applications/:id/pocs');
}]);

// Legacy...
// Create the 'Application' service
angular.module('dashboard').factory('Application', ['$resource', 'WcfConfig', function ($resource, WcfConfig) {
    // Use the '$resource' service to return an Application '$resource' object
    return $resource(WcfConfig.urlRoot + 'EAOpen.svc/applications:applicationName', {
        applicationId: '@Name'
    });
}]);

// Create the 'Application to Technology Mapping' service
angular.module('dashboard').factory('AppTechMap', ['$resource', 'WcfConfig', function ($resource, WcfConfig) {
    // Use the '$resource' service to return an AppTechMap '$resource' object
    return $resource(WcfConfig.urlRoot + 'EAOpen.svc/GetAppTechMap', {
        applicationId: '@Name'
    });
}]);

// Create the 'Application to Technology Mapping' service
angular.module('dashboard').factory('FuncAppMap', ['$resource', 'WcfConfig', function ($resource, WcfConfig) {
    // Use the '$resource' service to return an AppTechMap '$resource' object
    return $resource(WcfConfig.urlRoot + 'EAOpen.svc/GetFuncAppMap', {
        applicationId: '@Name'
    });
}]);




// Create the 'System' service
angular.module('dashboard').factory('System', ['$resource', 'WcfConfig', function ($resource, WcfConfig) {
    // Use the '$resource' service to return a System '$resource' object
    return $resource(WcfConfig.urlRoot + 'EAOpen.svc/systems:systemId', {
        systemId: '@_id'
    });
}]);

// Create the 'TIME' service
angular.module('dashboard').factory('TIME', ['$resource', 'WcfConfig', function ($resource, WcfConfig) {
    // Use the '$resource' service to return a TIME '$resource' object
    return $resource(WcfConfig.urlRoot + 'EAOpen.svc/application_time/', {
        appId: '@appId'
    });
}]);

// Create the 'Interfaces' service
angular.module('dashboard').factory('Interface', ['$resource', 'WcfConfig', function ($resource, WcfConfig) {
    // Use the '$resource' service to return an Interface '$resource' object
    return $resource(WcfConfig.urlRoot + 'EAOpen.svc/interfaces/', {
        appId: '@appId'
    });
}]);
