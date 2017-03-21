/* eslint-disable */

﻿// Invoke 'strict' JavaScript mode
'use strict';

angular.module('dashboard')
// replaces: 'Application'
.factory('ApplicationsSrc', ['$resource', 'WcfConfig', function ($resource, WcfConfig) {
    return $resource('/api/v0/applications/:id');
}])
// replaces 'FuncAppMap'
.factory('AppCapabilitiesSrc', ['$resource', 'WcfConfig', function ($resource, WcfConfig) {
    return $resource('/api/v0/applications/:id/capabilities');
}])
// new
.factory('AppPOCsSrc', ['$resource', 'WcfConfig', function ($resource, WcfConfig) {
    return $resource('/api/v0/applications/:id/pocs');
}])
// replaces 'AppTechMap'
.factory('AppTechnologiesSrc', ['$resource', 'WcfConfig', function ($resource, WcfConfig) {
    return $resource('/api/v0/applications/:id/technologies');
}])
// replaces 'TIME'
.factory('AppTIMESrc', ['$resource', 'WcfConfig', function ($resource, WcfConfig) {
    return $resource('/api/v0/apptime/:id/');
}])
// TODO:
// tbr: 'Interfaces' (OR should it be a child of applications, e.g. applications/:id/interfaces)
.factory('InterfacesSrc', ['$resource', 'WcfConfig', function ($resource, WcfConfig) {
    return $resource('/api/v0/interfaces/:id/');
}])
// tbr: 'System'
.factory('SystemSrc', ['$resource', 'WcfConfig', function ($resource, WcfConfig) {
    return $resource('/api/v0/parentsystems/:id/');
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
