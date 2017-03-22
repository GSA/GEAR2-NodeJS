/* eslint-disable */

// Invoke 'strict' JavaScript mode
'use strict';

// Create the 'business' controller
angular.module('dashboard').controller('ApplicationController', ['$route', '$scope', '$http', '$routeParams', '$filter', '$location', '$sce', '$window',
  'ApplicationsSrc', 'AppCapabilitiesSrc', 'AppTechnologiesSrc', 'AppPOCsSrc', 'ParentSystemsSrc',
  'System', 'AppTIMESrc', 'AppTechMap', 'ITStandard', 'FuncAppMap', 'BusFunction', 'Interface', 'FISMA', 'bstSearchUtils',
function ($route, $scope, $http, $routeParams, $filter, $location, $sce, $window,
  ApplicationsSrc, AppCapabilitiesSrc, AppTechnologiesSrc, AppPOCsSrc, ParentSystemsSrc,
  System, AppTIMESrc, AppTechMap, ITStandard, FuncAppMap, BusFunction, Interface, FISMA, bstSearchUtils) {
  $scope.rootPath = '';
  $scope.bstData = [];
  $scope.$bstEl = null;
  $scope.bstFilter = {};
  $scope.tableFilterList = [];
  $scope.hasUsedSearchForm = false;

  // Method to create Applications table
  $scope.createAppTable = function () {
    $scope.$bstEl = $('#appstable');
    $scope.hasUsedSearchForm = false;
    $scope.rootPath = '/applications';

    if ($.isEmptyObject($routeParams)){
      // Use the Organization 'query' method to send an appropriate GET request
      var applications = ApplicationsSrc.query();
    }
    else{
      var applications = ApplicationsSrc.query({sso:$routeParams.applicationSSO});
    }
    $scope.applications = applications;
    applications.$promise.then(function (populateData) {
      $.each(applications, function (key, val) {
        if ([val.Status] != "Retired" && [val.SSO_Display_Name] != "External" && [val.Type] != "Website") {
          var sys = '';
          var fismasys = '';
          if ([val.System] == ''){
            sys = "N/A";
          }
          else {
            sys = val.System;
          }
          if (val.FismaName != ""){
            fismasys = val.FismaName;
          }
          else {
            fismasys = "N/A";
          }
          $scope.bstData.push({
            "Name": val.Name,
            "Description": val.Description,
            "SSO": val.SSO,
            "Owner": val["Owner"],
            "System": sys,
            "BusinessPOC": val.BusinessPOC,
            "TechnicalPOC": val.TechnicalPOC,
            "Cloud": val.Cloud,
            "TechnologyPlatform": val.TechnologyPlatform,
            "Status": val.Status,
            "Alias": val.Alias,
            "RegionClassification": val.RegionClassification,
            "HostingProvider": val.HostingProvider,
            "FismaSystem": fismasys,
            "Id": val.Id,
            "Investment": val.Investment,
            "IsRevenueGenerator": val.IsRevenueGenerator,
            "DesktopComponent": val.DesktopComponent
          });
        }
      });

      bstSearchUtils.checkFilterState($scope);

      // Bootstrap Table config obj on $scope so we can decouple from
      // init call and mutate options/properties a little more cleanly
      $scope.bsTableConfig = {
        columns: [{
          field: 'Name',
          title: 'Application Name',
          sortable: true
        }, {
          field: 'Alias',
          title: 'Alias',
          sortable: true,
          visible: false
        }, {
          field: 'Description',
          title: 'Description',
          sortable: true
        }, {
          field: 'SSO',
          title: 'SSO',
          sortable: true
        }, {
          field: 'Owner',
          title: '2 Letter Office',
          sortable: true
        }, {
          field: 'System',
          title: 'Parent System',
          sortable: true,
        }, {
          field: 'RegionClassification',
          title: 'Region Classification',
          sortable: true,
          visible: false
        }, {
          field: 'IsRevenueGenerator',
          title: 'Revenue Generator',
          sortable: true,
          visible: false

        }, {
          field: 'BusinessPOC',
          title: 'Business POC',
          sortable: true,
          visible: false
        }, {
          field: 'TechnicalPOC',
          title: 'Technical POC',
          sortable: true,
          visible: false
        }, {
          field: 'HostingProvider',
          title: 'Hosting Provider',
          sortable: true,
          visible: false
        },{
          field: 'Cloud',
          title: 'Cloud',
          sortable: true,
          visible: false
        },{
          field: 'TechnologyPlatform',
          title: 'Platform',
          sortable: true,
          visible: false
        }, {
          field: 'Status',
          title: 'Status',
          sortable: true
        }, {
          field: 'FismaSystem',
          title: 'FISMA System',
          sortable: true,
          visible: false
        }, {
          field: 'Id',
          title: 'Id',
          sortable: true,
          visible: false
        }, {
          field: 'Investment',
          title: 'Investment',
          sortable: true,
          visible: false

        }],
        data: $scope.bstData
      }

      bstSearchUtils.updateConfig($scope);

      // Initialize Bootstrap Table plugin
      $scope.$bstEl.bootstrapTable($scope.bsTableConfig)

      bstSearchUtils.handleSearchState($scope);

    });
  }

  // Method to handle click events on Applications table
  $('#appstable').on('click-row.bs.table', function (e, row, $element) {
    // note: this :has selector cannot be cached; done this way to get
    // around caching & DOM availabily issues
    if (!!$('.bootstrap-table:not(:has(.dropdown-toggle[aria-expanded="true"]))').length) {
      var apppath = '/applications/' + row.Id;
      $location.path(apppath);
      $route.reload();
    }
  });

  // Method to create Retired Applications table
  $scope.createRetAppTable = function () {
    $scope.$bstEl = $('#retiredtable');
    $scope.hasUsedSearchForm = false;
    $scope.rootPath = '/applications_retired';
    // Use the Organization 'query' method to send an appropriate GET request
    var apps = ApplicationsSrc.query();
    apps.$promise.then(function (populateData) {
      $scope.bstData = [];
      $.each(apps, function (key, val) {
        if ([val.Status] == "Retired") {
          $scope.bstData.push({
            "Name" : val.Name,
            "Description" : val.Description,
            "SSO" : val.SSO_Display_Name,
            "Status" : val.Status,
            "RetiredYear" : val.RetiredYear,
            "Alias": val.Alias,
            "Id": val.Id
          });
        }
      });

      bstSearchUtils.checkFilterState($scope);
      $scope.bsTableConfig = {
        columns: [{
          field: 'Name',
          title: 'Application Name',
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
          field: 'RetiredYear',
          title: 'Retired Year (CY)',
          sortable: true
        }, {
          field: 'Alias',
          title: 'Alias',
          sortable: true,
          visible: false
        }],
        data: $scope.bstData
      }
      bstSearchUtils.updateConfig($scope);
      $scope.$bstEl.bootstrapTable($scope.bsTableConfig);
      bstSearchUtils.handleSearchState($scope);
    });
  }

  // Method to create TIME table
  $scope.createTIMETable = function () {
    $scope.$bstEl = $('#timetable');
    $scope.hasUsedSearchForm = false;
    $scope.rootPath = '/applications_TIME';
    // Use the TIME 'query' method to send an appropriate GET request
    var appstime = AppTIMESrc.query();
    var time = [];
    var appname = '';
    var owner = '';
    var id = '';
    var notes = '';
    var fy14 = '';
    var fy15 = '';
    var fy16 = '';
    var fy17 = '';
    var fy18 = '';
    var fy19 = '';
    var fy20 = '';
    var status = '';
    var parentsystem = '';
    appstime.$promise.then(function (populateTIME) {
      // Use the Application 'query' method to send an appropriate GET request
      var apps = ApplicationsSrc.query();
      apps.$promise.then(function (populateApps) {
        $scope.bstData = [];
        $.each(appstime, function (key, val) {
          appname = val.Name;
          owner = val.Owner;
          id = val.AppId;
          notes = val.TIMENotes;
          var parentsys = '';
          fy14 = val.FY14;
          fy15 = val.FY15;
          fy16 = val.FY16;
          fy17 = val.FY17;
          fy18 = val.FY18;
          fy19 = val.FY19;
          fy20 = val.FY20;
          $.each(apps, function (key, val) {
            if (val.Name == appname){
              status = val.Status;
              if ([val.System] == ''){
                parentsys = "N/A";
              }
              else {
                parentsys = val.System;
              }
            }
          });
          if (status != 'Retired') {
            $scope.bstData.push({
              "Owner" : owner,
              "Name" : appname,
              "Status" : status,
              "FY14" : fy14,
              "FY15" : fy15,
              "FY16" : fy16,
              "FY17" : fy17,
              "FY18" : fy18,
              "FY19" : fy19,
              "FY20" : fy20,
              "ParentSystem" : parentsys,
              "Id" : id,
              "Notes" : notes,
              "Alias" : val.Alias,
              "RegionClassification" : val.RegionClassification
            });
          }
        });
        bstSearchUtils.checkFilterState($scope);
        $scope.bsTableConfig = {
          columns: [{
            field: 'Owner',
            title: '2 Letter Office',
            sortable: true,
          }, {
            field: 'Alias',
            title: 'Alias',
            sortable: true,
            visible: false
          }, {
            field: 'Name',
            title: 'Application Name',
            sortable: true
          }, {
            field: 'ParentSystem',
            title: 'Parent System',
            sortable: true,
            visible: false
          }, {
            field: 'Status',
            title: 'Status',
            sortable: true
          }, {
            field: 'Id',
            title: 'Id',
            visible: false,
            sortable: true
          }, {
            field: 'Notes',
            title: 'Notes',
            visible: false,
            sortable: true

          }, {
            field: 'RegionClassification',
            title: 'Region Classification',
            visible: false,
            sortable: true
          }, {
            field: 'FY14',
            title: 'FY14',
            visible: false
          }, {
            field: 'FY15',
            title: 'FY15',
            visible: false
          }, {
            field: 'FY16',
            title: 'FY16',
            visible: false
          }, {
            field: 'FY17',
            title: 'FY17'
          }, {
            field: 'FY18',
            title: 'FY18'
          }, {
            field: 'FY19',
            title: 'FY19'
          }, {
            field: 'FY20',
            title: 'FY20'
          }],
          data: $scope.bstData
        };
        bstSearchUtils.updateConfig($scope);
        $scope.$bstEl.bootstrapTable($scope.bsTableConfig);
        bstSearchUtils.handleSearchState($scope);
      });
    });
  }

  // Method to handle click events on ApplicationTIME table
  $('#timetable').on('click-row.bs.table', function (e, row, $element) {
    // note: this :has selector cannot be cached; done this way to get
    // around caching & DOM availabily issues
    if (!!$('.bootstrap-table:not(:has(.dropdown-toggle[aria-expanded="true"]))').length) {
      var apppath = row.Id
      apppath = apppath.replace(/\//g , "-%")
      $location.path('/applications/' + apppath);
      $route.reload();
    }
  });

  // Method to create Systems table
  $scope.createSystemsTable = function () {
    $scope.$bstEl = $('#systemtable');
    $scope.hasUsedSearchForm = false;
    $scope.rootPath = '/systems';
    // Use the System 'query' method to send an appropriate GET request
    var systems = ParentSystemsSrc.query();
    systems.$promise.then(function (populateData) {
      $scope.bstData = systems;
      bstSearchUtils.checkFilterState($scope);
      $scope.bsTableConfig = {
        columns: [{
          field: 'Name',
          title: 'System Name',
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
          field: 'Id',
          title: 'Id',
          sortable: true,
          visible: false
        }],
        data: $scope.bstData
      };
      bstSearchUtils.updateConfig($scope);
      $scope.$bstEl.bootstrapTable($scope.bsTableConfig);
      bstSearchUtils.handleSearchState($scope);
    });
  }

  // Method to handle click events on Systems table
  $('#systemtable').on('click-row.bs.table', function (e, row, $element) {
    // note: this :has selector cannot be cached; done this way to get
    // around caching & DOM availabily issues
    if (!!$('.bootstrap-table:not(:has(.dropdown-toggle[aria-expanded="true"]))').length) {
      var syspath = row.Id;
      syspath = syspath.replace(/\//g , "-%")
      $location.path('/systems/' + syspath);
      $route.reload();
    }
  });

  // Method for retrieving a single System's details
  $scope.createSysDetail = function() {
    $(function () {
      $('[data-toggle="tooltip"]').tooltip()
    });
    // Use the Application 'get' method to send an appropriate GET request
    var system = ParentSystemsSrc.query({ id: $routeParams.id });
    var sysid = '';
    system.$promise.then(function (populateData) {
      $.each(system, function (key, val) {
        $scope.sysId = val.Id;
        sysid = val.Id;
        $scope.sysName = val.Name;
        $scope.sysDescription = val.Description;
        $scope.sysURL = val.URL;
      });
      // Use the System 'query' method to send an appropriate GET request
      var apps = ApplicationsSrc.query();
      apps.$promise.then(function (populateApps) {
        var appgroup = [];
        $.each(apps, function (key, val) {
          if (val.System == $scope.sysName){
            appgroup.push({"Name" : val.Name, "Description" : val.Description, "SSO" : val.SSO_Display_Name, "Status" : val.Status, "Id" : val.Id });
          }
        });
        $('#sysapptable').bootstrapTable({
          columns: [{
            field: 'Name',
            title: 'Application Name',
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
          data: appgroup
        });
      });
    });
  }

  // Method to handle click events on the Child Applications table within a System's detail page
  $('#sysapptable').on('click-row.bs.table', function (e, row, $element) {
    // note: this :has selector cannot be cached; done this way to get
    // around caching & DOM availabily issues
    if (!!$('.bootstrap-table:not(:has(.dropdown-toggle[aria-expanded="true"]))').length) {
      var apppath = row.Id;
      apppath = apppath.replace(/\//g , "-%")
      $location.path('/applications/' + apppath);
      $route.reload();
    }
  });

  // Method for retrieving a single application's details
  $scope.createAppDetail = function() {
    $(function () {
      $('[data-toggle="tooltip"]').tooltip()
    });

    var appId = $routeParams.applicationId,
    application = ApplicationsSrc.query({ id: appId }),
    capabilities = AppCapabilitiesSrc.query({ id: appId }),
    technologies = AppTechnologiesSrc.query({ id: appId }),
    pocs = AppPOCsSrc.query({ id: appId }),
    time = AppTIMESrc.query({ id: appId }),
    interfaces = Interface.query({ appId: appId });

    application.$promise.then(function (d) {
      // rule is multiple URLs are single string, delimited with a comma
      if(!!application[0].Url && application[0].Url.indexOf(',') > -1) {
        application[0].Url = application[0].Url.split(',');
      } else if (!!application[0].Url) {
        application[0].Url = [application[0].Url];
      } else {
        application[0].Url = [];
      }

      $scope.application = application[0];

      time.$promise.then(function () {
        $scope.time = time;
      });

      interfaces.$promise.then(function () {
        $scope.interfaces = interfaces;
      });

      pocs.$promise.then(function () {
        $scope.pocs = pocs;
      });

      capabilities.$promise.then(function () {
        $('#appcaptable').bootstrapTable({
          columns: [{
            field: 'Name',
            title: 'Business Capability',
            sortable: true
          }, {
            field: 'Description',
            title: 'Description',
            sortable: true
          }, {
            field: 'Id',
            title: 'Id',
            visible: false
          }],
          data: capabilities
        });
      });

      technologies.$promise.then(function () {
        $('#apptechtable').bootstrapTable({
          columns: [{
            field: 'Name',
            title: 'Technology',
            sortable: true
          }, {
            field: 'Description',
            title: 'Description',
            sortable: true
          }, {
            field: 'Status',
            title: 'Status',
            sortable: true
          }],
          data: technologies
        });
      });

    });
  }

  // Method to handle click events on the related capabilities table within a Application's detail page
  $('#appcaptable').on('click-row.bs.table', function (e, row, $element) {
    // note: this :has selector cannot be cached; done this way to get
    // around caching & DOM availabily issues
    if (!!$('.bootstrap-table:not(:has(.dropdown-toggle[aria-expanded="true"]))').length) {
      $location.path('/capability/' + row.Id);
      $route.reload();
    }
  });

  // Method to handle click events on the related standards table within a Application's detail page
  $('#apptechtable').on('click-row.bs.table', function (e, row, $element) {
    // note: this :has selector cannot be cached; done this way to get
    // around caching & DOM availabily issues
    if (!!$('.bootstrap-table:not(:has(.dropdown-toggle[aria-expanded="true"]))').length) {
      $location.path('/itstandards/' + row.Id);
      $route.reload();
    }
  });

  // Method for Interfaces by SSO chart
  $scope.createInterfaceSSOChart = function (appId, orgId) {
    var appid = appId;
    var orgid = orgId;
    var apps = ApplicationsSrc.query();
    var interfacelist = [];
    var providerid = '';
    var consumerid = '';
    var finallist = {};
    var uniquelist = [];
    apps.$promise.then(function (findApplications) {
      var interfaces = Interface.query();
      interfaces.$promise.then(function (populateData) {
        var count = [];
        var applist = [];
        var app = '';
        var appowner = '';
        var source = '';
        var target = '';
        $.each(interfaces, function (key, val) {
          if (val.Appid == appId || val.RefAppid == appId || appId == 'all') {
            providerid = val.Appid;
            consumerid = val.RefAppid;
            $.each(apps, function (key, val){
              if (providerid == val.Id && (orgid == 'all' || orgid == val.Owner)){
                app = val.Name;
                appowner = val.Owner;
                source = app;
                applist.push({'name' : app, 'group' : appowner})
                $.each(apps, function (key, val){
                  if (consumerid == val.Id){
                    app = val.Name;
                    appowner = val.Owner;
                    target = app;
                    applist.push({'name' : app, 'group' : appowner});
                  }
                });
              }
              else if (consumerid == val.Id && (orgid =='all' || orgid == val.Owner)){
                app = val.Name;
                appowner = val.Owner;
                target = app;
                applist.push({'name' : app, 'group' : appowner})
                $.each(apps, function (key, val){
                  if (providerid == val.Id){
                    app = val.Name;
                    appowner = val.Owner;
                    source = app;
                    applist.push({'name' : app, 'group' : appowner});
                  }
                });
              }

            });
            uniquelist = _.uniq(applist, function(item, key, name) {
              return item.name;
            });
            var sourceindex = $.map(uniquelist, function(obj, index) {
              if(obj.name == source) {
                return index;
              }
            })
            sourceindex = sourceindex[0];
            var targetindex = $.map(uniquelist, function(obj, index) {
              if(obj.name == target) {
                return index;
              }
            })
            targetindex = targetindex[0];
            if (sourceindex != undefined && targetindex != undefined){
              interfacelist.push({'source' : sourceindex, 'target' : targetindex});
            }
          }
        });


        finallist = {"nodes" : uniquelist, "links" : interfacelist};

        //Constants for the SVG
        var width = 960,
        height = 500;

        //Set up the colour scale
        var color = d3.scale.category20();

        //Set up the force layout
        var force = d3.layout.force()
        .charge(-120)
        .linkDistance(30)
        .size([width, height]);


        var node_drag = d3.behavior.drag()
        .on("dragstart", dragstart)
        .on("drag", dragmove)
        .on("dragend", dragend);
        function dragstart(d, i) {
          force.stop() // stops the force auto positioning before you start dragging
        }
        function dragmove(d, i) {
          d.px += d3.event.dx;
          d.py += d3.event.dy;
          d.x += d3.event.dx;
          d.y += d3.event.dy;
        }
        function dragend(d, i) {
          d.fixed = true; // of course set the node to fixed so the force doesn't include the node in its auto positioning stuff
          force.resume();
        }
        function releasenode(d) {
          d.fixed = false; // of course set the node to fixed so the force doesn't include the node in its auto positioning stuff
          //force.resume();
        }



        //Append a SVG to the body of the html page. Assign this SVG as an object to svg
        var svg = d3.select("#interfacessochart").append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("id", "interfacesvg");
        //Read the data from the finallist element
        var graph = finallist;


        var padding = 10, // separation between circles
        radius=8;
        function collide(alpha) {
          var quadtree = d3.geom.quadtree(graph.nodes);
          return function(d) {
            var rb = 2*radius + padding,
            nx1 = d.x - rb,
            nx2 = d.x + rb,
            ny1 = d.y - rb,
            ny2 = d.y + rb;
            quadtree.visit(function(quad, x1, y1, x2, y2) {
              if (quad.point && (quad.point !== d)) {
                var x = d.x - quad.point.x,
                y = d.y - quad.point.y,
                l = Math.sqrt(x * x + y * y);
                if (l < rb) {
                  l = (l - rb) / l * alpha;
                  d.x -= x *= l;
                  d.y -= y *= l;
                  quad.point.x += x;
                  quad.point.y += y;
                }
              }
              return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
            });
          };
        }

        force
        .nodes(graph.nodes)
        .links(graph.links)
        .start();

        var link = svg.selectAll(".link")
        .data(graph.links)
        .enter().append("line")
        .attr("class", "link")
        .style("stroke-width", function(d) { return Math.sqrt(d.value); });

        var node = svg.selectAll(".node")
        .data(graph.nodes)
        .enter().append("g")
        .attr("class", "node")
        .on('dblclick', releasenode)
        .call(node_drag) //Added
        .on('click', connectedNodes); //Added code
        node.append("circle")
        .attr("r", 8)
        .style("fill", function (d) {
          return color(d.group);
        })

        node.append("text")
        .attr("class", "labeltext")
        .attr("dx", 10)
        .attr("dy", ".35em")
        .text(function(d) { return d.name });


        //Insert Legend

        var legend = svg.selectAll(".legend")
        .data(color.domain())
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

        legend.append("rect")
        .attr("x", width - 18)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", color);

        legend.append("text")
        .attr("x", width - 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function(d) { return d; });





        force.on("tick", function() {
          link.attr("x1", function (d) {
            return d.source.x;
          })
          .attr("y1", function (d) {
            return d.source.y;
          })
          .attr("x2", function (d) {
            return d.target.x;
          })
          .attr("y2", function (d) {
            return d.target.y;
          });
          d3.selectAll("circle").attr("cx", function (d) {
            return d.x;
          })
          .attr("cy", function (d) {
            return d.y;
          });
          d3.selectAll(".labeltext").attr("x", function (d) {
            return d.x;
          })
          .attr("y", function (d) {
            return d.y;
          });
          node.each(collide(0.5)); //Added
        });


        //Toggle stores whether the highlighting is on
        var toggle = 0;

        //Create an array logging what is connected to what
        var linkedByIndex = {};
        for (var i = 0; i < graph.nodes.length; i++) {
          linkedByIndex[i + "," + i] = 1;
        };
        graph.links.forEach(function (d) {
          linkedByIndex[d.source.index + "," + d.target.index] = 1;
        });

        //This function looks up whether a pair are neighbours
        function neighboring(a, b) {
          return linkedByIndex[a.index + "," + b.index];
        }

        function connectedNodes() {
          if (toggle == 0) {
            //Reduce the opacity of all but the neighbouring nodes
            var d = d3.select(this).node().__data__;
            node.style("opacity", function (o) {
              return neighboring(d, o) | neighboring(o, d) ? 1 : 0.1;
            });

            link.style("opacity", function (o) {
              return d.index==o.source.index | d.index==o.target.index ? 1 : 0.1;
            });

            //Reduce the op
            toggle = 1;
          } else {
            //Put them back to opacity=1
            node.style("opacity", 1);
            link.style("opacity", 1);
            toggle = 0;
          }
        }
      });

    });
  }
}
]);
