/* eslint-disable */

var app = angular.module('dashboard');

app.controller('appsBySsoChartController', function ($scope, Application) {
  $scope.transformData = function (d) {
    var active = _.filter(d, function (item) {
      return item.Type !== 'Website' && item.Status !== 'Retired' && item.SSO_Name !== 'External'
      && item.SSO_Name.indexOf('Sample Office') < 0;
    });
    var grouped = _.countBy(active, "SSO_Display_Name");

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
  var query = Application.query();

  query.$promise
  .then(function (res) {
    $scope.dataset = $scope.transformData(res);
  })
  .catch(function (e) {
    $scope.apiWarning = true;
    $scope.dataset = true;
  });
});
