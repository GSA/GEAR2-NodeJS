'use strict';

angular.module('release-notes', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/release_notes', {
        templateUrl: 'views/release-notes/release-notes.html',
        controller: 'ReleaseNotesCtrl'// name match , this part is the router(config block ln 5-10)
  });
}])

.controller('ReleaseNotesCtrl', ['$scope', function ($scope) {// scope in angular is global scope 
    //$scope.tester = new Array(6);
    $scope.date = "11/04/2016";
    //$scope.test =[
    //    'Hello world',
    //    'second line <b>!!!</b>'
    //];

}]);
