'use strict';

angular.module('apps.graveyard', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/applications_graveyard', {
    templateUrl: 'views/apps-graveyard/apps-graveyard.html',
    controller: 'AppsGraveyardCtrl'
  });
}])

.controller('AppsGraveyardCtrl', ['$scope', function ($scope) {
}]);
