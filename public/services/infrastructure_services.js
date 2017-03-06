// Invoke 'strict' JavaScript mode
'use strict';

// Create the 'IT Standards' service
angular.module('dashboard').factory('ITStandard', ['$resource', 'WcfConfig', function ($resource, WcfConfig) {
    // Use the '$resource' service to return an IT Standards '$resource' object
    //return $resource(WcfConfig.urlRoot + 'EAOpen.svc/GetITStandard:itstandardId', {
	return $resource(WcfConfig.urlRoot + 'EAOpen.svc/it_standards/All', {
        //itstandardId: '@_id'
		itstandardId: '@Name'
    });
}]);

// Create the 'IT Standards' service
angular.module('dashboard').factory('ITStandardByCat', ['$resource', 'WcfConfig', function ($resource, WcfConfig) {
    // Use the '$resource' service to return an IT Standards '$resource' object
    //return $resource(WcfConfig.urlRoot + 'EAOpen.svc/GetITStandard:itstandardId', {
    return $resource(WcfConfig.urlRoot + 'EAOpen.svc/it_standards/ByCategory', {
        //itstandardId: '@_id'
        itstandardId: '@Name'
    });
}]);
