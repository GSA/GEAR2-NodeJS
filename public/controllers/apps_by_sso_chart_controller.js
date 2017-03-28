/* eslint-disable */

var app = angular.module('dashboard');

app.controller('appsBySsoChartController', function ($scope, ApplicationsSrc) {
  $scope.transformData = function (d) {
    var active = _.filter(d, function (item) {
      // TODO: check if business logic is redundant with new API or if we can remove any if-statements
      var pass = false;
      if (Object.hasOwnProperty.call(item, 'Type') && item.Type && item.Type !== 'Website') {
        pass = true;
      }
      if (Object.hasOwnProperty.call(item, 'Status') && item.Status && item.Status !== 'Retired') {
        pass = true;
      }
      if (Object.hasOwnProperty.call(item, 'SSO') && item.SSO && item.SSO !== 'External') {
        pass = true;
      }
      if (Object.hasOwnProperty.call(item, 'SSO') && item.SSO && item.SSO.indexOf('Sample Office') < 0) {
        pass = true;
      }
      return pass;
    });
    var grouped = _.countBy(active, "SSO");

    var mapped = _.map(grouped, function (val, lab) {
      return {
        key: _.uniqueId('sso_'),
        label: lab,
        display: $scope.stripQuotes(lab),
        count: val
      };
    });
    return _.sortBy(mapped, 'count').reverse();
  };
  $scope.stripQuotes = function (str) {
    var re = /^\"(.*)\"$/;
    if (re.test(str)) {
      str = str.substring(1, str.length - 1);
    }
    return str;
  };
  var query = ApplicationsSrc.query();
  query.$promise.then(function (res) {
    $scope.dataset = $scope.transformData(res);
  })
  .catch(function (e) {
    $scope.apiWarning = true;
    $scope.dataset = true;
  });
});
