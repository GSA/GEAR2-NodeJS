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
                      d3.select("#interfacetab").style("display", "block");
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

  $scope.createInterfaceSSOChart1 = function (appId, orgName) {
    // TODO: there are better ways filtering Interfaces. Let's choose one that isn't dependent on args like this. -mld
    var interfaces = null,
        CONTAINER_ID = 'interfacessochart',
        SVG_ID = 'interfacesvg';

    if (document.getElementById(SVG_ID)) {
      return false;
    }

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
      var width = $('#' + CONTAINER_ID).parents('.panel-body').width(),
      height = 500;

      // Because sometimes in IE, $.width() returns 0
      if (!width) {
        width = 930; // best fit @1280px screen width in IE11
      }

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
      var svg = d3.select('#' + CONTAINER_ID).append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("id", SVG_ID);
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
  
  
  
  $scope.createInterfaceSSOChart = function (appId, orgName) {
    var interfaces = null,
        CONTAINER_ID = 'interfacessochart',
        SVG_ID = 'interfacesvg';

    if (document.getElementById(SVG_ID)) {
      return false;
    }
	var data = [];
    if (appId && !orgName) {
      interfaces = AppInterfacesSrc.query({ id: appId });
    } else if (!appId && orgName) {
      interfaces = InterfacesSrc.query({ owner: orgName });
    } else {
      interfaces = InterfacesSrc.query();
    }
	$scope.interfaces = interfaces;
    interfaces.$promise.then(function (populateData) {
		$.each(interfaces,function(key,val){
			data.push({
				"AppID1":val.AppID1,
				"AppID2":val.AppID2,
				"Name1":val.Name1,
				"Name2":val.Name2,
				"NameShort1":val.NameShort1,
				"NameShort2":val.NameShort2,
				"SSO1":val.SSO1,
				"SSO2":val.SSO2,
				"SSOShort1":val.SSOShort1,
				"SSOShort2":val.SSOShort2,
				"Owner1":val.Owner1,
				"Owner2":val.Owner2,
				"OwnerShort1":val.OwnerShort1,
				"OwnerShort2":val.OwnerShort2,
				"count": 1,		
			})
		})
	  //Constants for the SVG
      var w = $('#' + CONTAINER_ID).parents('.panel-body').width(),
      h = 500;

      // Because sometimes in IE, $.width() returns 0
      if (!w) {
        w = 930; // best fit @1280px screen width in IE11
      }
		var mpr = chordMpr(data);

			mpr
			  .addValuesToMap("NameShort1")//,['NameShort1','Owner1','OwnerShort1','SSO1','SSOShort1'])
			  
			  .setFilter(function (row, a, b) {
            return (row.NameShort1 === a.name && row.NameShort2 === b.name);
			  })
			  .setAccessor(function (recs, a, b) {
				if (!recs[0]) return 0;
				return +recs[0].count;
			  });
			drawChords(mpr.getMatrix(), mpr.getMap());
	//	}) 
	function drawChords (matrix, mmap) {
		var r1 = h / 1.8, r0 = r1 - 80; //w = 880, h = 700, 
	   // var w = 980, h = 800, r1 = h / 2, r0 = r1 - 100;
		var color = d3.scale.category20b();
		var fill = d3.scale.ordinal()
                 .range(['#6b6ecf','#b5cf6b','#e7ba52','#d6616b','#de9ed6','#393b79','#637939',	'#8c6d31','#843c39','#7b4173','#ce6dbd','#9c9ede','#cedb9c','#e7cb94','#e7969c','#5254a3','#8ca252','#bd9e39','#ad494a','#a55194',])
            // .range(['#c7b570','#c6cdc7','#335c64','#768935','#507282','#5c4a56','#aa7455','#574109','#837722','#73342d','#0a5564','#9c8f57','#7895a4','#4a5456','#b0a690','#0a3542',]);
      var chord = d3.layout.chord()
                    .sortSubgroups(d3.descending)
                    .sortChords(d3.descending);  
      
      var mmapsize = mpr.size(mmap);
      if(mmapsize <=2){
           chord.padding(2);}
      else{
            chord.padding(.02);}

      var arc = d3.svg.arc()
            .innerRadius(r0)
            .outerRadius(r0 + 20);
			
			
      
      var svg = d3.select('#' + CONTAINER_ID).append("svg")
		  .attr("width", w)
		  .attr("height", h)
		  .attr("id", SVG_ID)
		  .append("svg:g")
	//            .attr("id", "circle")
		  .attr("transform", "translate(" + w/2 + "," + h/2 + ")");
		  
      // if(mmapsize <=2){
            // svg.attr("transform", "translate(" + w / 2 + "," + h / 2 + ") rotate(57) ");}
            svg.append(SVG_ID)
               .attr("r", r0 + 20);

      var rdr = chordRdr(matrix, mmap);
      chord.matrix(matrix);

      var g = svg.selectAll("g.group")
            .data(chord.groups())
			.enter().append("svg:g")
            .attr("class", "group")
			
			// .attr("data-legend",function(d) { return d.name})
            .on("mouseover", mouseover)
            .on("mouseout", function (d) { d3.select("#tooltip1").style("visibility", "hidden") })
			.on("click", mouseclick);
			

        g.append("svg:path")
            .style("stroke", "black")
            .style("fill", function(d) { return fill(rdr(d).gownershort); })//d.index  //group color control, colored by owner 2 letter office
            .attr("d", arc);

        g.append("svg:text")
            .each(function(d) { d.angle = (d.startAngle + d.endAngle) / 2; })
            .attr("dy", ".35em")
            .style("font-family", "helvetica, arial, sans-serif")
            .style("font-size", "10px")
            .style("font-weight", "bold")
            .attr("text-anchor", function(d) { return d.angle > Math.PI ? "end" : null; })
            .attr("transform", function(d) {
              return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")"
                  + "translate(" + (r0 + 26) + ")"
                  + (d.angle > Math.PI ? "rotate(180)" : "");
            })
            .text(function(d) { return rdr(d).gname; });

	
		
		 //Insert Legend			
		    var legend = svg.selectAll(".legend")
			  .data(fill.domain())
			  .enter().append("g")
			  .attr("class", "legend")
			  .attr("transform", function(d, i) { return "translate(" + (-w/8) + "," + i * 20 + ")"; }); //"translate(" + w / 6 + "," + h / 4 + ")"
			
	
			  legend.append("rect")
			  .attr("x", w/2 - 45)
			  .attr("width", 18)
			  .attr("height", 18)
			  .style("fill", fill);

			  legend.append("text")
			  .attr("x", w/2 - 50)
			  .attr("y", 9)
			  .attr("dy", ".35em")
			  .style("text-anchor", "end")
			  .text(function(d) { return d; });  
			  // if(mmapsize <=2){
			  // legend.attr("transform", function(d, i) { return "translate(" + w/6 + "," + i * 20 + ") rotate(-57)"; });}
					  
			  
          var chordPaths = svg.selectAll("path.chord")
                .data(chord.chords())
				.enter().append("svg:path")
                .attr("class", "chord")
				.style("stroke-opacity", .4) // set the stroke opacity
				.style("stroke", "#3182bd")      // set the line colour, #3182bd seems GSA Blue
				.style("fill", "#c6dbef")      // set the fill colour
				// .style("stroke", function(d) { return d3.rgb(fill(+rdr(d).sdata.SSO1)).darker(); })//+rdr(d).sdata.SSO1)
                // .style("fill", function(d) { return fill(+rdr(d).sdata.SSO1); })//+rdr(d).sdata.SSO1)
                // .style("stroke", function(d) { return d3.rgb(fill(d.source.index)).darker(); })
                // .style("fill", function(d) { return fill(d.source.index); })
                .attr("d", d3.svg.chord().radius(r0))
                .on("mouseover", function (d) {
                  d3.select("#tooltip1")
                    .style("visibility", "visible")
                    .html(chordTip(rdr(d)))//controls whether the tips are moving or not
                    .style("top", function () { return (d3.event.pageY - 100)+"px"})
                    .style("left", function () { return (d3.event.pageX-w/2)+"px";})
                })
                .on("mouseout", function (d) { d3.select("#tooltip1").style("visibility", "hidden") });
				
			g.attr("transform", "translate(-80,0)");
			chordPaths.attr("transform", "translate(-80,0)");

          function chordTip (d) {
            var p = d3.format(".2%"), q = d3.format(",.1r")
            return "Interface Data:<br/>"
               +"Coming soon..."
             // + p(d.svalue/d.stotal) + " (" + q(d.svalue) + ") of "
              //+ d.sname + " connects to " + d.tname
              //+ (d.sname === d.tname ? "": ("<br/>while...<br/>"
             //+ p(d.tvalue/d.ttotal) + " (" + q(d.tvalue) + ") of "
              //+ d.tname + " prefer " + d.sname))
          }

          function groupTip (d) {
            var p = d3.format(".1%"), q = d3.format(",.1r")
            return "Application Infomation:<br/>"
				+ "Long Name: "+ d.gnamelong + " <br/>" 
				//+ " SSO : " d.gdata.SSO1 + " <br/>"
				+ "Owner: "+ d.gowner + " <br/>"
                // + d.gname + " Connects to : " + q(d.gvalue) + " other Applications on this model<br/>"
                //+ p(d.gvalue/d.mtotal) + " of Matrix Total (" + q(d.mtotal) + ")"
          }

		  function mouseclick(d) {
			  var appid = rdr(d).gid;
				$location.path('/applications/' + appid);
				$scope.$apply();
				}
          
		  
          function mouseover(d, i) {
            d3.select("#tooltip1")
              .style("visibility", "visible")
              .html(groupTip(rdr(d)))
              .style("top", function () { return (d3.event.y - 80)+"px"})//d3.event.pageY
              .style("left", function () { return (d3.event.x- 80)+"px";})//d3.event.pageX
		  
		  chordPaths.classed("fade", function(p) {
              return p.source.index != i
                  && p.target.index != i;
            });
          }
      }
	
	})  
  }
  
  }
]);
