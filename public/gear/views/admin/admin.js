'use strict';

angular.module('admin', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/admin', {
    templateUrl: 'views/admin/admin.html',
    controller: 'AdminCtrl'
  });
}])
.controller('AdminCtrl', ['$scope', '$http', '$location', '$route', function ($scope, $http, $location, $route) {
  $http({method: 'GET', url: '/ua'})
    .success(function (d) {
      $http({method: 'GET', url: '/api/v0.1/fisma'})
        .success(function (f) {
          $scope.user = d.user;
          $scope.rows = f.rows;
        });
    });
}]);
