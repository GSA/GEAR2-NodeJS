/* eslint-disable */

// Invoke 'strict' JavaScript mode
'use strict';

// replaces 'FISMA'
angular.module('dashboard')
.factory('FISMASrc', ['$resource', 'WcfConfig', function ($resource, WcfConfig) {
  return $resource('/api/v1/fisma/:id');
}])
.factory('FISMAexpSrc', ['$resource', 'WcfConfig', function ($resource, WcfConfig) {
  return $resource('/api/v1/fismaexp');
}])
.factory('FISMAexp1Src', ['$resource', 'WcfConfig', function ($resource, WcfConfig) {
  return $resource('/api/v1/fismaexp/thisyear');
}])
.factory('FISMAexp2Src', ['$resource', 'WcfConfig', function ($resource, WcfConfig) {
  return $resource('/api/v1/fismaexp/nextyear');
}])
.factory('FISMAApplicationsSrc', ['$resource', 'WcfConfig', function ($resource, WcfConfig) {
  return $resource('/api/v1/fisma/:id/applications');
}])
.factory('FISMAPOCsSrc', ['$resource', 'WcfConfig', function ($resource, WcfConfig) {
  return $resource('/api/v1/fisma/:id/pocs');
}])
.factory('FISMAAppsSrc', ['$resource', 'WcfConfig', function ($resource, WcfConfig) {
  return $resource('/api/v1/fisma/:id/applications');
}])


// TODO:
// tbr 'RISSO'
.factory('POCSrc', ['$resource', 'WcfConfig', function ($resource, WcfConfig) {
  return $resource('/api/v1/pocs/:id');
}])
// note: old FISMAPOC was UNUSED



//Legacy
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

// Create the 'FISMAexp' service
angular.module('dashboard').factory('FISMAexp', ['$resource', 'WcfConfig', function ($resource, WcfConfig) {
  // Use the '$resource' service to return an FISMA System '$resource' object
  return $resource(WcfConfig.urlRoot + 'EAOpen.svc/fisma_systems/', {
    fismaId: '@_id'
  });
}]);

// Create the 'FISMAexp1' service (i.e. FISMA systems expiring this fiscal year)
angular.module('dashboard').factory('FISMAexp1', ['$resource', 'WcfConfig', function ($resource, WcfConfig) {
  // Use the '$resource' service to return an FISMA System '$resource' object
  return $resource(WcfConfig.urlRoot + 'EAOpen.svc/fisma_systems/', {
    fismaId: '@_id'
  });
}]);

// Create the 'FISMAexp2' service (i.e. FISMA systems expiring next fiscal year)
angular.module('dashboard').factory('FISMAexp2', ['$resource', 'WcfConfig', function ($resource, WcfConfig) {
  // Use the '$resource' service to return an FISMA System '$resource' object
  return $resource(WcfConfig.urlRoot + 'EAOpen.svc/fisma_systems/', {
    fismaId: '@_id'
  });
}]);