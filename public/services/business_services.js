// Invoke 'strict' JavaScript mode
'use strict';

angular.module('dashboard')
.factory('OrganizationsSrc', ['$resource', 'WcfConfig', function ($resource, WcfConfig) {
    return $resource('/api/v0/organizations/:id');
}]);

// Legacy
// Create the 'Organization' service
angular.module('dashboard').factory('Organization', ['$resource', 'WcfConfig', function ($resource, WcfConfig) {
    // Use the '$resource' service to return an Organization '$resource' object
    return $resource(WcfConfig.urlRoot + 'EAOpen.svc/organizations:organizationId', {
        organizationId: '@_id'
    });
}]);

// Create the 'Function' service
angular.module('dashboard').factory('BusFunction', ['$resource', 'WcfConfig', function ($resource, WcfConfig) {
    // Use the '$resource' service to return an Organization '$resource' object
    return $resource(WcfConfig.urlRoot + 'EAOpen.svc/capabilities:brmId', {
        brmId: '@_id'
    });
}]);

// Create the 'Organization to Application Mapping' service
angular.module('dashboard').factory('OrgAppMap', ['$resource', 'WcfConfig', function ($resource, WcfConfig) {
    // Use the '$resource' service to return an OrgAppMap '$resource' object
    return $resource(WcfConfig.urlRoot + 'EAOpen.svc/GetOrgAppMap', {
        organizationId: '@Name'
    });
}]);

// Create the 'Organization to System Mapping' service
angular.module('dashboard').factory('OrgSysMap', ['$resource', 'WcfConfig', function ($resource, WcfConfig) {
    // Use the '$resource' service to return an OrgSysMap '$resource' object
    return $resource(WcfConfig.urlRoot + 'EAOpen.svc/GetOrgSysMap', {
        organizationId: '@Name'
    });
}]);

// Create the 'Organization to Goal Mapping' service
angular.module('dashboard').factory('OrgGoalMap', ['$resource', 'WcfConfig', function ($resource, WcfConfig) {
    // Use the '$resource' service to return an OrgGoalMap '$resource' object
    return $resource(WcfConfig.urlRoot + 'EAOpen.svc/GetOrgGoalMap', {
        organizationId: '@Name'
    });
}]);
