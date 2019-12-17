/* eslint-disable */

var app = angular.module('dashboard');

app.controller('appsBySsoChartController', function($scope, ApplicationsSrc) {
  $scope.transformData = function(d) {
    var active = _.filter(d, function(item) {
      // TODO: check if business logic is redundant with new API or if we can remove any if-statements
      var pass = false;
      if (
        (Object.hasOwnProperty.call(item, 'Status') && item.Status !== 'Retired') &&
        (Object.hasOwnProperty.call(item, 'SSO') && item.SSO !== null) &&
        (item.SSO.toLowerCase() !== 'external') &&
        (item.SSO.indexOf('Sample Office') < 0)) {
        pass = true;
      }
      return pass;
    });
    var grouped = _.countBy(active, "SSOShort");

    var mapped = _.map(grouped, function(val, lab) {
      return {
        key: _.uniqueId('sso_'),
        label: lab,
        display: $scope.stripQuotes(lab),
        count: val
      };
    });
    return _.sortBy(mapped, 'count').reverse();
  };
  $scope.stripQuotes = function(str) {
    var re = /^\"(.*)\"$/;
    if (re.test(str)) {
      str = str.substring(1, str.length - 1);
      console.log(str);
    }
    return str;
  };
  var query = ApplicationsSrc.query();
  query.$promise.then(function(res) {
      console.log('landing view', res);
      $scope.dataset = $scope.transformData(res);
    })
    .catch(function(e) {
      $scope.apiWarning = true;
      $scope.dataset = true;
    });
});
