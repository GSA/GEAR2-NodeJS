/* eslint-disable */

// Invoke 'strict' JavaScript mode
'use strict';

// replaces 'Organization'
angular.module('dashboard')
.factory('OrganizationsSrc', ['$resource', 'WcfConfig', function ($resource, WcfConfig) {
  return $resource('/api/v0/organizations/:id');
}])
// replaces 'OrgAppMap'
.factory('OrgAppsSrc', ['$resource', 'WcfConfig', function ($resource, WcfConfig) {
  return $resource('/api/v0/organizations/:id/applications');
}])
// TODO:// Orphan
// tbr: 'GetOrgSysMap'
.factory('OrgSysSrc', ['$resource', 'WcfConfig', function ($resource, WcfConfig) {
  return $resource('/api/v0/organizations/:id/systems');
}])
// replaces 'BusFunction' aka Capabilities
.factory('CapabilitiesSrc', ['$resource', 'WcfConfig', function ($resource, WcfConfig) {
  return $resource('/api/v0/capabilities/:id');
}])
// new CapApplicationsSrc (prev used apps AppFuncMap)
.factory('CapApplicationsSrc', ['$resource', 'WcfConfig', function ($resource, WcfConfig) {
  return $resource('/api/v0/capabilities/:id/applications');
}])
// new CapAppCountsSrc
.factory('CapAppCountsSrc', ['$resource', 'WcfConfig', function ($resource, WcfConfig) {
  return $resource('/api/v0/capabilities/app-counts');
}])
// Goal is UNUSED, but lets leave references for now



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
