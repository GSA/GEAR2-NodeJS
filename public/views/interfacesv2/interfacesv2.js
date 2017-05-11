'use strict';

angular.module('manager-page', ['ngRoute'])

 
.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/interfacesv2', {
    templateUrl: 'views/interfacesv2/interfacesv2.html',
    controller: 'interfacesv2Ctrl'
  });
}])

.factory('interfacesv2Src', ['$resource', 'WcfConfig', function ($resource, WcfConfig) { 
  return $resource('/api/v0/interfacesv2');}])//managerpage/:id

.controller('interfacesv2Ctrl', ['$scope', 'interfacesv2Src', function ($scope, interfacesv2Src) {
  // $scope.message = 'Manager Control Page';
  $scope.interv2 = interfacesv2Src.query();
      $scope.interv2.$promise.then(function () {
        $('#interfacesankey').bootstrapTable({
          // columns: [
        // {
            // field: 'NoFISMA',
            // title: 'No FISMA System',
            // sortable: true
        // },        {
            // field: 'NoInvest',
            // title: 'No Investment',
            // sortable: true
        // },        {
            // field: 'NoPOCs',
            // title: 'No POCS',
            // sortable: true
        // },        {
            // field: 'NoOwnOrg',
            // title: 'No Owning Org',
            // sortable: true
        // },        {
            // field: 'NoAppPlat',
            // title: 'No Application Platform',
            // sortable: true
        // },        {
            // field: 'NoTech',
            // title: 'No Technology',
            // sortable: true
        // }
          // ],
          data: $scope.interv2
        });
      })
        
}]);
