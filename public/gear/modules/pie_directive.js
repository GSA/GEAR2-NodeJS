/* eslint-disable */

dashboard.directive('pie', function ($location) {
  'use strict';

  return {
    template: '<i ng-show="!dataset" ' +
    'class="load-indicator fa fa-spinner fa-spin fa-2x"></i>' +
    '<i ng-show="apiWarning" class="load-warning fa fa-warning">' +
    'Database services are unavailable at this time.</i>',
    link: function (scope, element, attrs) {
      scope.$watch(function (scope) {return scope.dataset;},
      function (newValue, oldValue) {
        if (!!newValue && newValue.constructor && newValue.constructor === Array) {
          gsaea.pie.init({
            $scope: scope,
            $location: $location,
            el: '#appssopiehchart',
            dataset: scope.dataset,
            hoverIncrease: 0.05, // how much larger mouseover slices become
            margin: {
              top: 15,
              right: 15,
              bottom: 15,
              left: 15
            },
            width: 'auto',
            height: 300 - 38 // hard-coded panel-heading, TBF
          });
        }
      });
    }
  };
});
