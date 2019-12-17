/* eslint-disable */

// Invoke 'strict' JavaScript mode
'use strict';

// replaces 'Investment'
angular.module('dashboard')
  .factory('InvestmentsSrc', ['$resource', 'WcfConfig', function($resource,
    WcfConfig) {
    return $resource('/api/v0/investments/:id');
  }])
  // new
  .factory('InvestmentAppsSrc', ['$resource', 'WcfConfig', function($resource,
    WcfConfig) {
    return $resource('/api/v0/investments/:id/applications');
  }])
  // new
  .factory('InvestmentPOCsSrc', ['$resource', 'WcfConfig', function($resource,
    WcfConfig) {
    return $resource('/api/v0/investments/:id/pocs');
  }])
// Goal is UNUSED, but lets leave references for now

// Legacy
// Create the 'Investment' service
angular.module('dashboard').factory('Investment', ['$resource', 'WcfConfig',
  function($resource, WcfConfig) {
    // Use the '$resource' service to return a Goal '$resource' object
    return $resource(WcfConfig.urlRoot +
      'EAOpen.svc/investments:investmentName', {
        investmentName: '@Name'
      });
  }
]);

// Create the 'Goal' service
angular.module('dashboard').factory('Goal', ['$resource', 'WcfConfig', function(
  $resource, WcfConfig) {
  // Use the '$resource' service to return a Goal '$resource' object
  return $resource(WcfConfig.urlRoot + 'EAOpen.svc/goals:goalId', {
    goalId: '@_id'
  });
}]);
