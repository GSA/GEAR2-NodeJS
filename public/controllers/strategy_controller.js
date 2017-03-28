/* eslint-disable */

// Invoke 'strict' JavaScript mode
'use strict';

// Create the 'strategy' controller
angular.module('dashboard').controller('StrategyController', ['$route','$scope', '$http', '$routeParams', '$filter', '$location', '$sce', '$window', 'Goal', 'InvestmentsSrc', 'InvestmentAppsSrc', 'Utils', 'bstSearchUtils',
function ($route, $scope, $http, $routeParams, $filter, $location, $sce, $window, Goal, InvestmentsSrc, InvestmentAppsSrc, Utils, bstSearchUtils) {
  $scope.rootPath = '';
  $scope.bstData = [];
  $scope.$bstEl = null;
  $scope.bstFilter = {};
  $scope.tableFilterList = [];
  $scope.hasUsedSearchForm = false;

  // Method for Goal table
  $scope.createGoalTable = function () {
    $scope.$bstEl = $('#goaltable');
    $scope.hasUsedSearchForm = false;
    $scope.rootPath = '/goals';

    $scope.tablename = 'GSA Goals';
    var goals = Goal.query();
    goals.$promise.then(function (populateData) {
      $scope.bstData = goals;
      bstSearchUtils.checkFilterState($scope);
      $scope.bsTableConfig = {
        columns: [{
          field: 'ID',
          title: 'ID',
          sortable: true
        }, {
          field: 'Name',
          title: 'Goal Name',
          sortable: true
        }, {
          field: 'Description',
          title: 'Description',
          sortable: true
        }, {
          field: 'TargetDate',
          title: 'Target Date',
          sortable: true
        }, {
          field: 'Owner',
          title: 'Owning Organization',
          sortable: true
        }],
        data: $scope.bstData
      };
      bstSearchUtils.updateConfig($scope);
      $scope.$bstEl.bootstrapTable($scope.bsTableConfig);
      bstSearchUtils.handleSearchState($scope);
    });
  }

  // Method for Investments table
  $scope.createInvestmentTable = function () {
    $scope.$bstEl = $('#investmenttable');
    $scope.hasUsedSearchForm = false;
    $scope.rootPath = '/investments';

    var investments = InvestmentsSrc.query();

    investments.$promise.then(function () {
      $scope.bstData = [];
      // plain, default, "all-records", etc. report
      if ($.isEmptyObject($routeParams) ||
      (typeof $routeParams.query !== 'undefined' &&
      !$routeParams.hasOwnProperty('investmentType'))){
        _.each(investments, function (item) {
          if ((item.Active !== 'No')) {
            $scope.bstData.push(item);
          }
        });
      }
      // pre-filter report for a single Investment Type
      else {
        var invtype = '';
        var filteredinv =[];
        invtype = $routeParams.investmentType;
        _.each(investments, function (item) {
          if ([item.Type] == invtype) {
            filteredinv.push(item);
          }
          else if ([item.Type] == "") {
            if (invtype == "Unknown"){
              filteredinv.push(item);
            }
          }
        });
        $scope.bstData = filteredinv;
      }
      bstSearchUtils.checkFilterState($scope);
      $scope.bsTableConfig = {
        columns: [{
          field: 'Name',
          title: 'Investment Name',
          sortable: true
        },{
          field: 'Description',
          title: 'Description',
          sortable: true
        },{
          field: 'Type',
          title: 'Type',
          sortable: true
        }, {
          field: 'PSA',
          title: 'Primary Service Area',
          sortable: true
        }, {
          field: 'SSA',
          title: 'Secondary Service Area',
          sortable: true,
          visible: false
        }, {
          field: 'InvManager',
          title: 'Investment Manager',
          sortable: true
        }, {
          field: 'UII',
          title: 'UII',
          visible: false,
          sortable: true
        }],
        data: $scope.bstData
      };
      bstSearchUtils.updateConfig($scope);
      $scope.$bstEl.bootstrapTable($scope.bsTableConfig);
      bstSearchUtils.handleSearchState($scope);
    });
  }

  // Method to handle click events on the Investments table
  $('#investmenttable').on('click-row.bs.table', function (e, row, $element) {
    // note: this :has selector cannot be cached; done this way to get
    // around caching & DOM availabily issues
    if (!!$('.bootstrap-table:not(:has(.dropdown-toggle[aria-expanded="true"]))').length) {
      $location.path('/investment/' + row.ID);
      $route.reload();
    }
  });

  // Method for retrieving a single investment's details
  $scope.createInvDetail = function() {
    $('[data-toggle="tooltip"]').tooltip()
    var investment = InvestmentsSrc.query({ id: $routeParams.id });
    investment.$promise.then(function () {
      $scope.investment = investment[0];
      $scope.applications = InvestmentAppsSrc.query({ id: $routeParams.id });
      $scope.applications.$promise.then(function () {
        $('#invrelappstable').bootstrapTable({
          columns: [{
            field: 'Name',
            title: 'Business Application Name',
            sortable: true
          }, {
            field: 'Description',
            title: 'Description',
            sortable: true
          }, {
            field: 'SSO',
            title: 'SSO',
            sortable: true
          }, {
            field: 'Status',
            title: 'Status',
            sortable: true
          }, {
            field: 'Id',
            title: 'Id',
            sortable: true,
            visible: false
          }],
          data: $scope.applications
        });
        // Method to handle click events on the Investments table
        $('#invrelappstable').on('click-row.bs.table', function (e, row, $element) {
          // note: this :has selector cannot be cached; done this way to get
          // around caching & DOM availabily issues
          if (!!$('.bootstrap-table:not(:has(.dropdown-toggle[aria-expanded="true"]))').length) {
            $location.path('/applications/' + row.Id);
            $route.reload();
          }
        });
      });
    });
  }

  // Method for creating the Investment Bar chart on the home page
  $scope.investmentBarData = null;
  $scope.createInvestmentBar = function(){
    // Use the Investment 'query' method to send an appropriate GET request
    var invests = InvestmentsSrc.query();
    var chartContainerSelector = '#investchart'; // used by d3
    var $chartContainer = $(chartContainerSelector); // used by jQuery
    var $spinner = $chartContainer.append('<i class="load-indicator fa fa-spinner fa-spin fa-2x"></i>');

    invests.$promise.then(function () {
      var count = _.countBy(invests, 'Type');
      var result = [];
      for (var i in count) {
        if (i == '') {
          result.push({"label" : 'Unknown', "value" : count[i]});
        }
        else {
          result.push({"label" : i, "value" : count[i]});
        }
      }
      result.sort();
      var investdata = [];
      investdata.push({ "key": "Cumulative Return", "values": result });
      $chartContainer.empty()

      $scope.investmentBarData = _.find(investdata, function (o) { return o.key === "Cumulative Return"; }).values;

      $scope.renderBarChart(chartContainerSelector, $scope.investmentBarData);
    })
    .catch(function error(msg) {
      console.error(msg);
      $chartContainer.html('<i class="load-warning fa fa-warning">System Architect services are unavailable at this time.</i>');
    });
  }
  // attach event handler to window.resize to redraw chart
  angular.element($window).bind('resize', _.debounce(function () {
    var chartContainerSelector = '#investchart';
    if (!!$(chartContainerSelector).find('svg')) {
      $(chartContainerSelector).find('svg').remove();
    }
    if ($scope.investmentBarData) {
      $scope.renderBarChart('#investchart', $scope.investmentBarData);
    }
  }, 200));

  $scope.renderBarChart = function (el, dataset) {
    var chartContainerSelector = el;
    var $chartContainer = $(el);
    var margin = {
      top: 20,
      right: 20,
      bottom: 70,
      left: 40
    },
    width = $chartContainer.width() - margin.left - margin.right,
    height = $('#investmentcontainer').height() - $('#investmentheader').height() - margin.top - margin.bottom,
    tooltip = null;

    var svg = d3.select(chartContainerSelector)
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .attr('class', 'investment-chart')
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' +
    margin.top + ')');

    var xScale = d3.scale.ordinal().rangeRoundBands([0, width], 0.025)
    .domain(_.map(dataset, function (d) {
      return d.label;
    }));

    var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient('bottom')
    .ticks(20)
    .innerTickSize(-height)
    .outerTickSize(0)
    .tickPadding(10);

    svg.append('g')
    .attr('class', 'ea-x-axis ea-axis')
    .attr('transform', 'translate(0,' + height + ')')
    .call(xAxis);

    var yScale = d3.scale.linear().range([height, 0])
    .domain([0, d3.max(dataset, function (d) {
      return d.value;
    })]);

    var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient('left')
    .ticks(5)
    .innerTickSize(-width)
    .tickPadding(10);

    svg.append('g')
    .attr('class', 'ea-y-axis ea-axis')
    .call(yAxis);

    svg.selectAll('rect')
    .data(dataset)
    .enter()
    .append('rect')
    .attr('class', 'ea-bar')
    .attr('x', function (d, i) {
      return xScale(d.label);
    })
    .attr('y', function (d) {
      return yScale(d.value);
    })
    .attr('width', function () {
      return xScale.rangeBand();
    })
    .attr('height', function (d) {
      return height - yScale(d.value);
    })
    .on('click', function (d) {
      $location.path('/investments/' + d.label);
      $scope.$apply();
    })
    .on('mouseover', function (d, i) {
      var x = d3.mouse(this)[0];
      var y = d3.mouse(this)[1];

      // first, we need to add the DOM El and identify it
      tooltip = d3.select(chartContainerSelector)
      .append('div')
      .attr('id', 'ea-tooltip')
      .attr('class', 'ea-tooltip');

      // then, we need to give it content so we can measure later
      tooltip.append('h5').html(d.value);
      tooltip.append('h6').html(d.label);

      // now, we use the rendered height to offset the y position
      x += xScale.rangeBand() * 0.25;
      y -= $('#ea-tooltip').height() * 0.5;

      // trap inside right edge
      if (x + $('#ea-tooltip').width() > $chartContainer.width()) {
        x -= $('#ea-tooltip').width();
      }
      // trap inside top edge
      if (y < 0) {
        y += $('#ea-tooltip').height();
        $('#ea-tooltip').find('h5').css({
          'border-top-left-radius': 0
        });
      }

      tooltip.style({
        left: x + 'px',
        top: y + 'px',
        width: (xScale.rangeBand() * 0.667) + 'px'
      });
    })
    .on('mousemove', function () {
      var x = d3.mouse(this)[0];
      var y = d3.mouse(this)[1];

      // use the rendered height to offset the y position
      x += xScale.rangeBand() * 0.33;
      y -= $('#ea-tooltip').height() * 0.25;

      // trap inside right edge
      if (x + $('#ea-tooltip').width() > $chartContainer.width()) {
        x -= $('#ea-tooltip').width();
      }
      // trap inside top edge
      if (y - $('#ea-tooltip').height() < 0) {
        y += $('#ea-tooltip').height();
      }

      if (tooltip) {
        tooltip.style({
          left: x + 'px',
          top: y + 'px',
        });
      }
    })
    .on('mouseout', function () {
      tooltip.remove();
    });

    svg.selectAll('.ea-bar-inner-label')
    .data(dataset)
    .enter()
    .append('text')
    .attr('class', 'ea-bar-inner-label')
    .attr('text-anchor', 'middle')
    .attr('x', function (d, i) {
      return xScale(d.label) + (xScale.rangeBand() / 2);
    })
    .attr('y', function (d) {
      var offset = parseInt($(this).css('font-size'));
      return yScale(d.value) + offset;
    })
    .text(function (d) {
      return d.value;
    });

    $('.ea-x-axis').find('.tick > text').each(function (i, el) {
      Utils.wrapSVGText(el, xScale.rangeBand());
    });

  }

}
]);
