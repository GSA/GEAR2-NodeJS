/* eslint-disable */

// Invoke 'strict' JavaScript mode
'use strict';

// Create the 'Infrastructure' controller
angular.module('dashboard').controller('InfrastructureController', ['$route', '$scope', '$http', '$routeParams', '$filter', '$location', '$sce', 'ITStandardsSrc', 'ITStdApplicationsSrc', 'ITStandardByCat', 'AppTechMap', 'Application', 'bstSearchUtils',
function ($route, $scope, $http, $routeParams, $filter, $location, $sce, ITStandardsSrc, ITStdApplicationsSrc, ITStandardByCat, AppTechMap, Application, bstSearchUtils) {
  $scope.rootPath = '';
  $scope.bstData = [];
  $scope.$bstEl = null;
  $scope.bstFilter = {};
  $scope.tableFilterList = [];
  $scope.hasUsedSearchForm = false;
  $scope.noITStdCommentsMsg = "No Comments for this Standard";

  // Method for IT Standards table
  $scope.createITStandardTable = function () {
    $scope.$bstEl = $('#standtable');
    $scope.hasUsedSearchForm = false;
    $scope.rootPath = '/itstandards';

    var itstandards = ITStandardsSrc.query();
    itstandards.$promise.then(function () {
      $scope.bstData = itstandards;

      bstSearchUtils.checkFilterState($scope);
      $scope.bsTableConfig = {
        columns: [{
          field: 'Name',
          title: 'Standard Name',
          sortable: true
        }, {
          field: 'Description',
          title: 'Description',
          sortable: true
        },  {
          field: 'Category',
          title: 'Category',
          sortable: true
        }, {
          field: 'Status',
          title: 'Status',
          sortable: true
        }, {
          field: 'DeploymentType',
          title: 'Deployment Type',
          sortable: true,
          visible: false
        }, {
          field: 'Comments',
          title: 'Comments',
          sortable: true,
          // class: 'col-rpt-varchar',
          // cellStyle: function (value, row, index, field) {
          //   return {
          //     classes: (value.length > 175)? 'col-rpt-wider' : 'col-rpt-wide',
          //   };
          // }
        },  {
          field: 'POC',
          title: 'POC',
          sortable: true,
          visible: false
        }, {
          field: 'ReferenceDocuments',
          title: 'Reference Documents',
          sortable: true,
          visible: false
        }, {
          field: 'ApprovalExpirationDate',
          title: 'Approval Expiration Date',
          sortable: true,
          visible: false
        }],
        data: $scope.bstData
      };
      bstSearchUtils.updateConfig($scope);
      $scope.$bstEl.bootstrapTable($scope.bsTableConfig);
      bstSearchUtils.handleSearchState($scope);
    });
  }// END Method for IT Standards table

  // Method for handling click events on the IT Standards table
  $('#standtable').on('click-row.bs.table', function (e, row, $element) {
    // note: this :has selector cannot be cached; done this way to get
    // around caching & DOM availabily issues
    if (!!$('.bootstrap-table:not(:has(.dropdown-toggle[aria-expanded="true"]))').length) {
      $location.path('/itstandards/' + row.ID);
      $route.reload();
    }
  });



  // Method for Gold Image table
  $scope.createGoldImageTable = function () {
    $scope.$bstEl = $('#goldtable');
    $scope.hasUsedSearchForm = false;
    $scope.rootPath = '/itstandards_goldimage';
    // Use the Organization 'query' method to send an appropriate GET request
    var stands = ITStandardsSrc.query();
    stands.$promise.then(function (populateData) {
      $scope.bstData = [];
      $.each(stands, function (key, val) {
        if ([val.GoldImage] == "T") {
          $scope.bstData.push({
            "Name" : val.Name,
            "Description" : val.Description,
            "Status" : val.Status,
            "GoldComment" : val.GoldImageComment
          });
        }
      });
      bstSearchUtils.checkFilterState($scope);
      $scope.bsTableConfig = {
        columns: [{
          field: 'Name',
          title: 'Name',
          sortable: true
        }, {
          field: 'Description',
          title: 'Description',
          sortable: true
        }, {
          field: 'Status',
          title: 'Status',
          sortable: true
        }, {
          field: 'GoldComment',
          title: 'Details',
        }],
        data: $scope.bstData
      };
      bstSearchUtils.updateConfig($scope);
      $scope.$bstEl.bootstrapTable($scope.bsTableConfig);
      bstSearchUtils.handleSearchState($scope);
    });


  }

  // Method for handling click events on the IT Standards table
  $('#goldtable').on('click-row.bs.table', function (e, row, $element) {
    // note: this :has selector cannot be cached; done this way to get
    // around caching & DOM availabily issues
    if (!!$('.bootstrap-table:not(:has(.dropdown-toggle[aria-expanded="true"]))').length) {
      var standpath = row.Name
 //     standpath = standpath.replace(/\//g , "-%")
      $location.path('/itstandards/' + standpath);
      $route.reload();
    }
  });

  // Method for retrieving a single IT Standard's detail
  $scope.createITStandDetail = function() {
    var currentId = $routeParams.id;
    $('[data-toggle="tooltip"]').tooltip()
    var itstandards = ITStandardsSrc.query({ id: currentId });
    itstandards.$promise.then(function () {
      var std = itstandards[0];
      $scope.standId = std.Id;
      $scope.standName = std.Name;
      $scope.standDescription = std.Description;
      $scope.cat = std.Category;
      $scope.poc = std.POC;
      $scope.status = std.Status;
      $scope.type = std.Type;
      $scope.comments = std.Comments||$scope.noITStdCommentsMsg;
      $scope.approvalExpirationDate = std.ApprovalExpirationDate;
	  $scope.refdocdetail = std.Refdocdetail;

      $scope.applications = ITStdApplicationsSrc.query({ id: currentId });
      $scope.applications.$promise.then(function () {
        // add related Apps here
        $('#standrelapptable').bootstrapTable({
          columns: [
          {
            field: 'Name',
            title: 'Business Application Name',
            sortable: true
          }, 
          {
            field: 'Alias',
            title: 'Alias',
            sortable: true,
            visible: false
          },
          {
            field: 'Description',
            title: 'Description',
            sortable: true
          },
          {
            field: 'SSOShort',
            title: 'SSO',
            sortable: true
          },
          {
            field: 'SSO',
            title: 'SSO (Long)',
            sortable: true,
            visible: false
          },
          {
            field: 'Owner',
            title: 'Two Letter Org (Long)',
            sortable: true,
            visible: false
          },
          {
            field: 'OwnerShort',
            title: 'Two Letter Org (Short)',
            sortable: true
            },		  
		  // {
            // field: 'Id',
            // title: 'Id',
            // sortable: true,
            // visible: false
          // }
          {
            field: 'BusinessPOC',
            title: 'Business POC',
            sortable: true,
            visible: false
          },
          {
            field: 'TechnicalPOC',
            title: 'Technical POC',
            sortable: true,
            visible: false
          },				
          {
            field: 'ParentSystem',
            title: 'Parent System',
            sortable: true,
            visible: false
          },
		   		{
            field: 'RegionClassification',
            title: 'Region Classification',
            sortable: true,
            visible: false
           },
          {
            field: 'IsRevenueGenerator',
            title: 'Revenue Generator',
            sortable: true,
            visible: false
          },
          {
            field: 'HostingProvider',
            title: 'Hosting Provider',
            sortable: true,
            visible: false
          },
          {
            field: 'Cloud',
            title: 'Cloud',
            sortable: true,
            visible: false
          },		  
          {
            field: 'TechnologyPlatform',
            title: 'Application Platform',
            sortable: true,
            visible: false
          },
		      {
            field: 'FY14',
            title: 'FY14',
            visible: false
          },
          {
            field: 'FY15',
            title: 'FY15',
            visible: false
          },
          {
            field: 'FY16',
            title: 'FY16',
             visible: false
          },
          {
            field: 'FY17',
            title: 'FY17',
            visible: false
          },
          {
            field: 'FY18',
            title: 'FY18',
            visible: false
          },
          {
            field: 'FY19',
            title: 'FY19',
            visible: false
          },
          {
            field: 'FY20',
            title: 'FY20',
            visible: false
          },
          {
            field: 'FY21',
            title: 'FY21',
            visible: false
          },
          {
            field: 'Notes',
            title: 'Notes',
            visible: false
          },
          {
            field: 'Status',
            title: 'Status',
            sortable: true,
            visible: false
          },
		{
          field: 'ProdYear',
          title: 'Production Year',
          sortable: true,
          visible: false
        },

          {
            field: 'FISMASystem',
            title: 'FISMA System',
            sortable: true,
            visible: false
          },
		// {
          // field: 'Id',
          // title: 'Id',
          // sortable: true,
          // visible: false
        // },
          {
            field: 'Investment',
            title: 'Investment',
            sortable: true,
            visible: false
          },
          {
            field: 'OMBUID',
            title: 'OMB Unique ID',
            sortable: true,
            visible: false
        }],
          data: $scope.applications
        });
      });

    });
  }

  // Method for handling click events on the IT Standards app table
  $('#standrelapptable').on('click-row.bs.table', function (e, row, $element) {
    // note: this :has selector cannot be cached; done this way to get
    // around caching & DOM availabily issues
    if (!!$('.bootstrap-table:not(:has(.dropdown-toggle[aria-expanded="true"]))').length) {
      $location.path('/applications/' + row.Id);
      $route.reload();
    }
  });

  // Method for IT Standards Heatmap
  $scope.createStandardsTree = function () {
    // Use the IT Standard By Category 'query' method to send an appropriate GET request
    var stands = ITStandardByCat.query();
    stands.$promise.then(function (populateData) {
      $('#standardsbody').html('<svg id="standardschart" class="dashboard"></svg>');
      var count = [];
      var parent = 'IT Standard Catagories';
      var parentcats = [];
      var parentname = '';
      var uparentcats = [];
      var uchildcats = [];
      var childcats = [];
      var childname = '';
      var parentnum = 0;
      var parentstandnum = 0;
      $.each(stands, function (key, val) {
        parentname = val.ParentCategory;
        parentnum = stands.length;
        var childstandnum = 0;
        $.each(stands, function (key, val) {
          if (val.ParentCategory == parentname){
            childstandnum = childstandnum + 1;
            childcats.push({'name' : val.Category, 'value' : 25, 'standnum' : childstandnum})
          }

          parentstandnum = parentstandnum + childstandnum;
          childstandnum = 0;
        });

        var uchildcats = _.uniq(childcats, function(item, key, name) {
          return item.name;
        });
        if (parentname == ""){
          parentname = 'Unknown';
        }
        parentcats.push({'name' : parentname, 'children' : uchildcats, 'standnum' : parentstandnum});
        childcats = [];
        uchildcats = [];
        parentstandnum = 0;
      });
      var uparentcats = _.uniq(parentcats, function(item, key, name) {
        return item.name;
      });
      var root = {'name' : parent, 'children' : uparentcats, 'standnum' : parentnum};


      //Begin the logic for creating the capability model

      var margin = {top: 20, right: 0, bottom: 0, left: 0},
      width = 960,
      height = 600 - margin.top - margin.bottom,
      formatNumber = d3.format(",d"),
      transitioning;

      var x = d3.scale.linear()
      .domain([0, width])
      .range([0, width]);

      var y = d3.scale.linear()
      .domain([0, height])
      .range([0, height]);

      var treemap = d3.layout.treemap()
      .children(function(d, depth) { return depth ? null : d._children; })
      .sort(function(a, b) { return a.value - b.value; })
      .ratio(height / width * 0.5 * (1 + Math.sqrt(5)))
      .round(false);


      var svg = d3.select("#standchart").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.bottom + margin.top)
      .style("margin-left", -margin.left + "px")
      .style("margin.right", -margin.right + "px")
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      .style("shape-rendering", "crispEdges");

      var grandparent = svg.append("g")
      .attr("class", "grandparent");

      grandparent.append("rect")
      .attr("y", -margin.top)
      .attr("width", width)
      .attr("height", margin.top);

      grandparent.append("text")
      .attr("x", 6)
      .attr("y", 6 - margin.top)
      .attr("dy", ".75em");


      initialize(root);
      accumulate(root);
      layout(root);
      display(root);

      function initialize(root) {
        root.x = root.y = 0;
        root.dx = width;
        root.dy = height;
        root.depth = 0;
      }

      // Aggregate the values for internal nodes. This is normally done by the
      // treemap layout, but not here because of our custom implementation.
      // We also take a snapshot of the original children (_children) to avoid
      // the children being overwritten when when layout is computed.
      function accumulate(d) {
        return (d._children = d.children)
        ? d.value = d.children.reduce(function(p, v) { return p + accumulate(v); }, 0)
        : d.value;
      }

      // Compute the treemap layout recursively such that each group of siblings
      // uses the same size (1×1) rather than the dimensions of the parent cell.
      // This optimizes the layout for the current zoom state. Note that a wrapper
      // object is created for the parent node for each group of siblings so that
      // the parent’s dimensions are not discarded as we recurse. Since each group
      // of sibling was laid out in 1×1, we must rescale to fit using absolute
      // coordinates. This lets us use a viewport to zoom.
      function layout(d) {
        if (d._children) {
          treemap.nodes({_children: d._children});
          d._children.forEach(function(c) {
            c.x = d.x + c.x * d.dx;
            c.y = d.y + c.y * d.dy;
            c.dx *= d.dx;
            c.dy *= d.dy;
            c.parent = d;
            layout(c);
          });
        }
      }




      function display(d) {
        grandparent
        .datum(d.parent)
        .on("click", transition)
        .select("text")
        .text(name(d));

        var g1 = svg.insert("g", ".grandparent")
        .datum(d)
        .attr("class", "depth");

        var g = g1.selectAll("g")
        .data(d._children)
        .enter().append("g")
        .on("contextmenu", function(d){
          var catpath = d.name;
          catpath = catpath.replace(/\//g , "-%")
          $location.path('/itstandards_ByCategory/' + catpath);
          $scope.$apply();
        });


        g.filter(function(d) { return d._children; })
        .classed("children", true)
        .on("click", transition);

        g.selectAll(".child")
        .data(function(d) { return d._children || [d]; })
        .enter().append("rect")
        .attr("class", "child")
        .call(rect);


        g.append("rect")
        .attr("class", "parent")
        .call(rect)
        .append("title")

        //		.text(function(d) { return d.name + ' : ' + d.description; });
        .text(function(d) { return 'Right-click to view the IT Standards for ' + d.name + '. Left-click to view the lower level categories.'; });

        g.append("text")
        .attr("dy", ".75em")
        .text(function(d) { return d.name; })
        .call(text);


        function transition(d) {
          if (transitioning || !d) return;
          transitioning = true;

          var g2 = display(d),
          t1 = g1.transition().duration(750),
          t2 = g2.transition().duration(750);

          // Update the domain only after entering new elements.
          x.domain([d.x, d.x + d.dx]);
          y.domain([d.y, d.y + d.dy]);

          // Enable anti-aliasing during the transition.
          svg.style("shape-rendering", null);

          // Draw child nodes on top of parent nodes.
          svg.selectAll(".depth").sort(function(a, b) { return a.depth - b.depth; });

          // Fade-in entering text.
          g2.selectAll("text").style("fill-opacity", 0);

          // Transition to the new view.
          t1.selectAll("text").call(text).style("fill-opacity", 0);
          t2.selectAll("text").call(text).style("fill-opacity", 1);
          t1.selectAll("rect").call(rect);
          t2.selectAll("rect").call(rect);

          // Remove the old node when the transition is finished.
          t1.remove().each("end", function() {
            svg.style("shape-rendering", "crispEdges");
            transitioning = false;
          });
        }

        return g;
      }

      function text(text) {
        text.attr("x", function(d) { return x(d.x) + 6; })
        .attr("y", function(d) { return y(d.y) + 6; });
      }

      function rect(rect) {
        var colorScale = d3.scale.linear()
        .domain([0, 200])
        .range(["#CEE3F6", "#045FB4"]);

        rect.attr("x", function(d) { return x(d.x); })
        .attr("y", function(d) { return y(d.y); })
        .attr("width", function(d) { return x(d.x + d.dx) - x(d.x); })
        .attr("height", function(d) { return y(d.y + d.dy) - y(d.y); })
        .style("fill", function(d) { return colorScale(d.standnum); });
      }

      function name(d) {
        return d.parent
        ? name(d.parent) + "." + d.name
        : d.name;
      }


      //		});


    });
  }
}
]);
