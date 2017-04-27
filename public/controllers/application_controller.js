/* eslint-disable */

// Invoke 'strict' JavaScript mode
'use strict';

// Create the 'business' controller
angular.module('dashboard').controller('ApplicationController', ['$route', '$scope', '$http', '$routeParams', '$filter', '$location', '$sce', '$window',
  'ApplicationsSrc', 'AppCapabilitiesSrc', 'AppTechnologiesSrc', 'AppPOCsSrc', 'ParentSystemsSrc', 'SysAppSrc', 'InterfacesSrc', 'AppInterfacesSrc', 'OrgInterfacesSrc',
  'System', 'AppTIMESrc', 'AppTechMap', 'ITStandard', 'FuncAppMap', 'BusFunction', 'Interface', 'FISMA', 'bstSearchUtils',
function ($route, $scope, $http, $routeParams, $filter, $location, $sce, $window,
  ApplicationsSrc, AppCapabilitiesSrc, AppTechnologiesSrc, AppPOCsSrc, ParentSystemsSrc, SysAppSrc, InterfacesSrc, AppInterfacesSrc, OrgInterfacesSrc,
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
      var applications = ApplicationsSrc.query({ownerName:$routeParams.ownerName});
    }
    $scope.applications = applications;
    applications.$promise.then(function (populateData) {
      $.each(applications, function (key, val) {
        if ([val.Status] != "Retired" && [val.SSO] != "External") {
          var sys = '';
          var fismasys = '';
          if ([val.ParentSystem] == ''){
            sys = "N/A";
          }
          else {
            sys = val.ParentSystem;
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
            "SSO": val.SSOShort,
            "Owner": val.Owner,
			"OwnerShort": val.OwnerShort,
            "System": sys,
            "BusinessPOC": val.BusinessPOC,
            "TechnicalPOC": val.TechnicalPOC,
            "Cloud": val.Cloud,
            "TechnologyPlatform": val.TechnologyPlatform,
            "Status": val.Status,
            "Alias": val.Alias,
            "RegionClassification": val.RegionClassification,
            "HostingProvider": val.HostingProvider,
            "FismaSystem": val.FISMASystem,
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
        columns: [
		{
          field: 'Name',
          title: 'Application Name',
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
          field: 'SSO',
          title: 'SSO',
          sortable: true
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
          field: 'System',
          title: 'Parent System',
          sortable: true,
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
          title: 'Platform',
          sortable: true,
          visible: false
        },
		{
          field: 'Status',
          title: 'Status',
          sortable: true
        },
		{
          field: 'FismaSystem',
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
            "Name": val.Name,
            "Description": val.Description,
            "SSO": val.SSOShort,
            "Owner": val.Owner,
			"OwnerShort": val.OwnerShort,
            "System": val.System,
            "BusinessPOC": val.BusinessPOC,
            "TechnicalPOC": val.TechnicalPOC,
            "Cloud": val.Cloud,
            "TechnologyPlatform": val.TechnologyPlatform,
            "Status": val.Status,
            "Alias": val.Alias,
            "RegionClassification": val.RegionClassification,
            "HostingProvider": val.HostingProvider,
            "FismaSystem": val.FISMASystem,
            "Id": val.Id,
            "Investment": val.Investment,
            "IsRevenueGenerator": val.IsRevenueGenerator,
            "DesktopComponent": val.DesktopComponent,
            "RetiredYear" : val.RetiredYear
          });
        }
      });

      bstSearchUtils.checkFilterState($scope);
      $scope.bsTableConfig = {
        columns: [		{
          field: 'Name',
          title: 'Application Name',
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
          field: 'SSO',
          title: 'SSO',
          sortable: true
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
          sortable: true,
		  visible: false
        },
		{
          field: 'System',
          title: 'Parent System',
          sortable: true,
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
          title: 'Platform',
          sortable: true,
          visible: false
        },
		{
          field: 'Status',
          title: 'Status',
          sortable: true
        },
		{
          field: 'FismaSystem',
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
          field: 'RetiredYear',
          title: 'Retired Year (CY)',
          sortable: true
        }
		],
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
	var sso = '';
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
          sso = val.SSOShort;
		  appname = val.Name;
          owner = val.OwnerShort;
          id = val.AppId;
          notes = val.Notes;
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
              if ([val.ParentSystem] == ''){
                parentsys = "N/A";
              }
              else {
                parentsys = val.ParentSystem;
              }
            }
          });
          if (status != 'Retired') {
            $scope.bstData.push({
              "Owner" : owner,
			  "SSO" : sso,
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
              "RegionClassification" : val.RegionClassification,
			  "OwnerLongName": val.Owner,
			  "BusinessPOC": val.BusinessPOC,
			  "TechnicalPOC": val.TechnicalPOC
            });
          }
        });
        bstSearchUtils.checkFilterState($scope);
        $scope.bsTableConfig = {
          columns: [
		  {
            field: 'SSO',
            title: 'SSO',
            visible: false,
            sortable: true
          },
		  {
            field: 'Owner',
            title: 'Two Letter Org (Short)',
            sortable: true,
          },
		  {
            field: 'OwnerLongName',
            title: 'Two Letter Org (Long)',
            visible: false,
            sortable: true
          },
		  {
            field: 'Alias',
            title: 'Alias',
            sortable: true,
            visible: false
          },
		  {
            field: 'Name',
            title: 'Application Name',
            sortable: true
          },
		  {
            field: 'ParentSystem',
            title: 'Parent System',
            sortable: true,
            visible: false
          },
		  {
            field: 'Status',
            title: 'Status',
            sortable: true
          },
		  // {
            // field: 'Id',
            // title: 'Id',
            // visible: false,
            // sortable: true
          // },
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
            title: 'FY17'
          },
		  {
            field: 'FY18',
            title: 'FY18'
          },
		  {
            field: 'FY19',
            title: 'FY19'
          },
		  {
            field: 'FY20',
            title: 'FY20'
          },
		  {
            field: 'Notes',
            title: 'Notes',
            visible: false,
            sortable: true

          },
		  {
            field: 'BusinessPOC',
            title: 'Business POC',
            visible: false,
            sortable: true

          },
		  {
            field: 'TechnicalPOC',
            title: 'Technical POC',
            visible: false,
            sortable: true
          },
		  {
            field: 'RegionClassification',
            title: 'Region Classification',
            visible: false,
            sortable: true
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
//      apppath = apppath.replace(/\//g , "-%")
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
        }
		// , {
          // field: 'Id',
          // title: 'Id',
          // sortable: true,
          // visible: false
        // }
		],
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
      $location.path('/systems/' + row.Id);
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
      //LEGACY
	  //var apps = ApplicationsSrc.query();
      /* apps.$promise.then(function (populateApps) {
        var appgroup = [];
        $.each(apps, function (key, val) {
          if (val.ParentSystem == $scope.sysName){
            appgroup.push({
				"Name" : val.Name,
				"Description" : val.Description,
				"SSO" : val.SSO_Display_Name,
				"Status" : val.Status,
				"Id" : val.Id,
				"Alias": val.Alias,
				"BusinessPOC": val.BusinessPOC,
				"TechnicalPOC": val.TechnicalPOC,
				"Owner":val.Owner
				});
          }
        }); */
		var sysapp = SysAppSrc.query({ id: $routeParams.id });
        sysapp.$promise.then(function (populateData) {

		$('#sysapptable').bootstrapTable({
          columns: [{
            field: 'Name',
            title: 'Application Name',
            sortable: true
          },
		  {
            field: 'Description',
            title: 'Description',
            sortable: true
          },
		  {
            field: 'Alias',
            title: 'Alias',
            sortable: true,
            visible: false
          },
		  {
            field: 'SSOShort',
            title: 'SSO',
            sortable: true
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
            field: 'Status',
            title: 'Status',
            sortable: true
          }
		  ],
          data: sysapp//appgroup
		//});
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
 //     apppath = apppath.replace(/\//g , "-%")
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
    interfaces = AppInterfacesSrc.query({ id: appId });

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
              $.each(application, function (i, app) {
                  $.each(interfaces, function (i, iface) {
                    if (iface.AppID1 == app.Id || iface.AppID2 == app.Id) {
                      d3.select("#interfaces-tab").style("display", "block");
                    }
                  });
               // };
              });
        $scope.interfaces = interfaces;

      });

      pocs.$promise.then(function () {
        $scope.pocs = pocs;
      });

      capabilities.$promise.then(function () {
        $('#appcaptable').bootstrapTable({
          columns: [
		{
            field: 'Ref',
            title: 'Hierarchy number',
        //    sortable: true
          },
		{
            field: 'Name',
            title: 'Business Capability',
            sortable: true
          },
		{
            field: 'Description',
            title: 'Description',
            sortable: true
          },
		// {
            // field: 'Id',
            // title: 'Id',
            // visible: false
          // },
		{
            field: 'ParentCap',
            title: 'Parent Capability',
            visible: false
          }
		],
          data: capabilities
        });
      });

      technologies.$promise.then(function () {
        $('#apptechtable').bootstrapTable({
          columns: [
		{
            field: 'Name',
            title: 'Technology',
            sortable: true
          },
		{
            field: 'Description',
            title: 'Description',
            sortable: true
          },
		{
            field: 'Status',
            title: 'Status',
            sortable: true
          },
		{
            field: 'Category',
            title: 'Software Category',
            sortable: true,
			visible: false
          },
		{
            field: 'Expiration',
            title: 'Approved Status Expiration Date',
            sortable: true,
			visible: false
          },
		],
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
      $location.path('/capabilities/' + row.Id);
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

  $scope.createInterfaceSSOChart = function (appId, orgName) {
    // TODO: there are better ways filtering Interfaces. Let's choose one that isn't dependent on args like this. -mld
    var interfaces = null;
    if (appId && !orgName) {
      interfaces = AppInterfacesSrc.query({ id: appId });
    } else if (!appId && orgName) {
      interfaces = InterfacesSrc.query({ owner: orgName });
    } else {
      interfaces = InterfacesSrc.query();
    }
    interfaces.$promise.then(function () {
      // Considering that each Interface has 2 Applications: Name1 & Name2, AppID1 & AppID2, etc...
      // . Gather all "1"s into a "source nodes" collection
      var sourceNodes = _.map(interfaces, function (el) {
        return {
          name: el.Name1,
          group: el.Owner1,
        }
      });
      // . Gather all "2"s into a "target nodes" collection
      var targetNodes = _.map(interfaces, function (el) {
        return {
          name: el.Name2,
          group: el.Owner2,
        }
      });
      // . Generate a list of the applications used across sourceNodes & targetNodes
      var nodes = sourceNodes.concat(targetNodes);
      nodes = _.sortBy(nodes, 'name');
      nodes = _.uniq(nodes, true, function (node) {
        return node.name + '--' + node.group;
      });

      // . translates our Interfaces API output into link objects where source is "1" and target is "2"
      // and their index values are retrieved by matching the Application.Name to a name in the nodes[]
      // array we created.
      var links = _.map(interfaces, function (el) {
        return {
          source: getIndex(el.Name1),
          target: getIndex(el.Name2),
        }
      });

      // . A utility. Because the visualization pulls data from the nodes[] collection using index
      function getIndex(appName) {
        var ind = -1;

        _.find(nodes, function (el, i) {
          if (el.name == appName) {
            ind = i;
          }
        });

        return ind;
      }

      var finallist = {"nodes" : nodes, "links" : links};

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
  }
}
]);
