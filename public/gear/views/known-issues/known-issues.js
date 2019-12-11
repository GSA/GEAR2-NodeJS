'use strict';

angular.module('known-issues', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/known_issues', {
    templateUrl: '/gear/views/known-issues/known-issues.html',
    controller: 'KnownIssuesCtrl'
  });
}])

.controller('KnownIssuesCtrl', ['$scope', function ($scope) {
 

 //$scope.tester = new Array(6);
}]);
