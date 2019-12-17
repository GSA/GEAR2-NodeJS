'use strict';

angular.module('manager-page', ['ngRoute'])


  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/manager_page', {
      templateUrl: 'views/manager-page/manager-page.html',
      controller: 'ManagerPageCtrl'
    });
  }])

  .factory('ManagerpageSrc', ['$resource', 'WcfConfig', function($resource,
    WcfConfig) {
    return $resource('/api/v0/managerpage/:id');
  }])

  .controller('ManagerPageCtrl', ['$scope', 'ManagerpageSrc', function($scope,
    ManagerpageSrc) {
    // $scope.message = 'Manager Control Page';
    $scope.mngdata = ManagerpageSrc.query();
    $scope.mngdata.$promise.then(function() {
      $('#managertable').bootstrapTable({
        columns: [{
          field: 'NoFISMA',
          title: 'No FISMA System',
          sortable: true
        }, {
          field: 'NoInvest',
          title: 'No Investment',
          sortable: true
        }, {
          field: 'NoPOCs',
          title: 'No POCS',
          sortable: true
        }, {
          field: 'NoOwnOrg',
          title: 'No Owning Org',
          sortable: true
        }, {
          field: 'NoAppPlat',
          title: 'No Application Platform',
          sortable: true
        }, {
          field: 'NoTech',
          title: 'No Technology',
          sortable: true
        }],
        data: $scope.mngdata
      });
    })

  }]);
