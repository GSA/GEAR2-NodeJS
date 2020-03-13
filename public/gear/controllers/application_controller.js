/* eslint-disable */

// Invoke 'strict' JavaScript mode
'use strict';

// Create the 'business' controller
angular.module('dashboard').controller('ApplicationController', ['$route',
  '$scope', '$http', '$routeParams', '$filter', '$location', '$sce',
  '$window', 'ApplicationsSrc', 'ApplicationsRetired', 'AppCapabilitiesSrc',
  'AppTechnologiesSrc', 'AppPOCsSrc', 'ParentSystemsSrc', 'SysAppSrc',
  'InterfacesSrc', 'AppInterfacesSrc', 'AppInterfacesv2Src',
  'OrgInterfacesSrc', 'System', 'AppTIMESrc', 'AppTechMap', 'ITStandard',
  'FuncAppMap', 'BusFunction', 'Interface', 'FISMA', 'bstSearchUtils',
  function($route, $scope, $http, $routeParams, $filter, $location, $sce,
    $window, ApplicationsSrc, ApplicationsRetired, AppCapabilitiesSrc,
    AppTechnologiesSrc, AppPOCsSrc, ParentSystemsSrc, SysAppSrc,
    InterfacesSrc, AppInterfacesSrc, AppInterfacesv2Src, OrgInterfacesSrc,
    System, AppTIMESrc, AppTechMap, ITStandard, FuncAppMap, BusFunction,
    Interface, FISMA, bstSearchUtils) {
    $scope.rootPath = '';
    $scope.bstData = [];
    $scope.$bstEl = null;
    $scope.bstFilter = {};
    $scope.tableFilterList = [];
    $scope.hasUsedSearchForm = false;


    // Method to create Applications table
    $scope.createAppTable = function() {
      $scope.$bstEl = $('#appstable');
      $scope.hasUsedSearchForm = false;
      $scope.rootPath = '/applications';

      if ($.isEmptyObject($routeParams)) {
        // Use the Organization 'query' method to send an appropriate GET request
        var applications = ApplicationsSrc.query();
      } else {
        var applications = ApplicationsSrc.query({
          ownerName: $routeParams.ownerName
        });
      }
      $scope.applications = applications;
      applications.$promise.then(function(populateData) {
        $.each(applications, function(key, val) {
          if ([val.Status] != "Retired" && [val.SSO] !=
            "External") {
            var sys = '';
            var fismasys = '';
            if ([val.ParentSystem] == '') {
              sys = "N/A";
            } else {
              sys = val.ParentSystem;
            }
            if (val.FismaName != "") {
              fismasys = val.FismaName;
            } else {
              fismasys = "N/A";
            }
            $scope.bstData.push({
              "Name": val.Name,
              "Description": val.Description,
              "SSO": val.SSOShort,
              "SSOLong": val.SSO,
              "Owner": val.Owner,
              "OwnerShort": val.OwnerShort,
              "System": sys,
              "BusinessPOC": val.BusPOC,
              "BusinessPOCOrg": val.BusPOCOrg,
              "TechnicalPOC": val.TechPOC,
              "TechnicalPOCOrg": val.TechPOCOrg,
              "Cloud": val.Cloud,
              "CUI": val.CUI,
              "TechnologyPlatform": val.TechnologyPlatform,
              "Status": val.Status,
              "DisplayName": val.DisplayName,
              "RegionClassification": val.RegionClassification,
              "HostingProvider": val.HostingProvider,
              "FismaSystem": val.FISMASystem,
              "Id": val.Id,
              "Investment": val.Investment,
              "IsRevenueGenerator": val.IsRevenueGenerator,
              "DesktopComponent": val.DesktopComponent,
              "OMBUID": val.OMBUID,
              "ProdYear": val.ProdYear
            });
          }
        });

        bstSearchUtils.checkFilterState($scope);

        // Bootstrap Table config obj on $scope so we can decouple from
        // init call and mutate options/properties a little more cleanly
        $scope.bsTableConfig = {
          columns: [{
              field: 'DisplayName',
              title: 'Display Name',
              sortable: true
            }, {
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
              field: 'SSOLong',
              title: 'SSO (Long)',
              sortable: true,
              visible: false
            }, {
              field: 'CUI',
              title: 'CUI',
              sortable: true,
              visible: false
            }, {
              field: 'Owner',
              title: 'Two Letter Org (Long)',
              sortable: true,
              visible: false
            }, {
              field: 'OwnerShort',
              title: 'Two Letter Org (Short)',
              sortable: true
            }, {
              field: 'BusinessPOC',
              title: 'Business POC',
              sortable: true,
              visible: false
            }, {
              field: 'BusinessPOCOrg',
              title: 'Business POC Org',
              sortable: true,
              visible: false
            }, {
              field: 'TechnicalPOC',
              title: 'Technical POC',
              sortable: true,
              visible: false
            }, {
              field: 'TechnicalPOCOrg',
              title: 'Technical POC Org',
              sortable: true,
              visible: false
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
              field: 'HostingProvider',
              title: 'Hosting Provider',
              sortable: true,
              visible: false
            }, {
              field: 'Cloud',
              title: 'Cloud',
              sortable: true,
              visible: false
            }, {
              field: 'TechnologyPlatform',
              title: 'Platform',
              sortable: true,
              visible: false
            }, {
              field: 'Status',
              title: 'Status',
              sortable: true
            }, {
              field: 'ProdYear',
              title: 'Production Year',
              sortable: true,
              visible: false
            }, {
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
            }, {
              field: 'OMBUID',
              title: 'Application ID',
              sortable: true,
              visible: false
            },
          ],
          data: $scope.bstData
        }

        bstSearchUtils.updateConfig($scope);

        // Initialize Bootstrap Table plugin
        $scope.$bstEl.bootstrapTable($scope.bsTableConfig)

        bstSearchUtils.handleSearchState($scope);

      });
    }

    // Method to handle click events on Applications table
    $('#appstable').on('click-row.bs.table', function(e, row, $element) {
      // note: this :has selector cannot be cached; done this way to get
      // around caching & DOM availabily issues
      if (!!$(
          '.bootstrap-table:not(:has(.dropdown-toggle[aria-expanded="true"]))'
        ).length) {
        var apppath = '/applications/' + row.Id;
        $location.path(apppath);
        $route.reload();
      }
    });

    // Method to create Retired Applications table
    $scope.createRetAppTable = function() {
      $scope.$bstEl = $('#retiredtable');
      $scope.hasUsedSearchForm = false;
      $scope.rootPath = '/applications_retired';
      // Use the Organization 'query' method to send an appropriate GET request
      var apps = ApplicationsRetired.query();
      apps.$promise.then(function(populateData) {
        $scope.bstData = [];
        $.each(apps, function(key, val) {
          if ([val.Status] == "Retired") {
            $scope.bstData.push({
              "Name": val.Name,
              "Description": val.Description,
              "SSO": val.SSOShort,
              "Owner": val.Owner,
              "OwnerShort": val.OwnerShort,
              "System": val.ParentSystem,
              "BusinessPOC": val.BusPOC,
              "TechnicalPOC": val.TechPOC,
              "Cloud": val.Cloud,
              "CUI": val.CUI,
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
              "RetiredYear": val.RetiredYear,
              "OBMUID": val.OMBUID,
              "ProdYear": val.ProdYear,
              "Replacedby": val.Replacedby
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
              field: 'CUI',
              title: 'CUI',
              sortable: true,
              visible: false
            }, {
              field: 'Owner',
              title: 'Two Letter Org (Long)',
              sortable: true,
              visible: false
            }, {
              field: 'OwnerShort',
              title: 'Two Letter Org (Short)',
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
              field: 'HostingProvider',
              title: 'Hosting Provider',
              sortable: true,
              visible: false
            }, {
              field: 'Cloud',
              title: 'Cloud',
              sortable: true,
              visible: false
            }, {
              field: 'TechnologyPlatform',
              title: 'Platform',
              sortable: true,
              visible: false
            }, {
              field: 'Status',
              title: 'Status',
              sortable: true
            }, {
              field: 'ProdYear',
              title: 'Production Year',
              sortable: true,
              visible: false
            }, {
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

            }, {
              field: 'RetiredYear',
              title: 'Retired Year (CY)',
              sortable: true
            }, {
              field: 'OMBUID',
              title: 'Application ID',
              sortable: true,
              visible: false
            }, {
              field: 'Replacedby',
              title: 'Application Replaced By',
              sortable: true,
              visible: false
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
    $scope.createTIMETable = function() {
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
      var fy21 = '';
      var fy22 = '';
      var fy23 = '';
      var fy24 = '';
      var fy25 = '';
      var fy26 = '';
      var status = '';
      var parentsystem = '';
      appstime.$promise.then(function(populateTIME) {
        // Use the Application 'query' method to send an appropriate GET request
        var apps = ApplicationsSrc.query();
        apps.$promise.then(function(populateApps) {
          $scope.bstData = [];
          $.each(appstime, function(key, val) {
            sso = val.SSOShort;
            appname = val.Name;
            owner = val.OwnerShort;
            id = val.AppId;
            notes = val.TIME_Notes;
            var parentsys = '';
            fy14 = val.FY14;
            fy15 = val.FY15;
            fy16 = val.FY16;
            fy17 = val.FY17;
            fy18 = val.FY18;
            fy19 = val.FY19;
            fy20 = val.FY20;
            fy21 = val.FY21;
            fy22 = val.FY22;
            fy23 = val.FY23;
            fy24 = val.FY24;
            fy25 = val.FY25;
            fy26 = val.FY26;
            $.each(apps, function(key, val) {
              if (val.Name == appname) {
                status = val.Status;
                if ([val.ParentSystem] == '') {
                  parentsys = "N/A";
                } else {
                  parentsys = val.ParentSystem;
                }
              }
            });
            if (status != 'Retired' && [val.SSO] !=
              "External") {
              $scope.bstData.push({
                "Owner": owner,
                "SSO": sso,
                "Name": appname,
                "Status": status,
                "ProdYear": val.ProdYear,
                "FY14": fy14,
                "FY15": fy15,
                "FY16": fy16,
                "FY17": fy17,
                "FY18": fy18,
                "FY19": fy19,
                "FY20": fy20,
                "FY21": fy21,
                "FY22": fy22,
                "FY23": fy23,
                "FY24": fy24,
                "FY25": fy25,
                "FY26": fy26,
                "ParentSystem": parentsys,
                "Id": id,
                "Notes": notes,
                "Alias": val.Alias,
                "CUI": val.CUI,
                "RegionClassification": val
                  .RegionClassification,
                "OwnerLongName": val.Owner,
                "BusinessPOC": val.BusinessPOC,
                "TechnicalPOC": val.TechnicalPOC,
                "OMBUID": val.OMBUID
              });
            }
          });
          bstSearchUtils.checkFilterState($scope);
          $scope.bsTableConfig = {
            columns: [{
                field: 'SSO',
                title: 'SSO',
                visible: false,
                sortable: true
              }, {
                field: 'Owner',
                title: 'Two Letter Org (Short)',
                sortable: true,
              }, {
                field: 'OwnerLongName',
                title: 'Two Letter Org (Long)',
                visible: false,
                sortable: true
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
                field: 'CUI',
                title: 'CUI',
                sortable: true,
                visible: false
              }, {
                field: 'Status',
                title: 'Status',
                sortable: true
              }, {
                field: 'ProdYear',
                title: 'Production Year',
                sortable: true,
                visible: false
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
                title: 'FY17',
                visible: false
              }, {
                field: 'FY18',
                title: 'FY18'
              }, {
                field: 'FY19',
                title: 'FY19'
              }, {
                field: 'FY20',
                title: 'FY20'
              }, {
                field: 'FY21',
                title: 'FY21'
              }, {
                field: 'FY22',
                title: 'FY22',
                visible: false
              }, {
                field: 'FY23',
                title: 'FY23',
                visible: false
              }, {
                field: 'FY24',
                title: 'FY24',
                visible: false
              }, {
                field: 'FY25',
                title: 'FY25',
                visible: false
              }, {
                field: 'FY26',
                title: 'FY26',
                visible: false
              }, {
                field: 'Notes',
                title: 'Notes',
                visible: false,
                sortable: true
              }, {
                field: 'BusinessPOC',
                title: 'Business POC',
                visible: false,
                sortable: true
              }, {
                field: 'TechnicalPOC',
                title: 'Technical POC',
                visible: false,
                sortable: true
              }, {
                field: 'RegionClassification',
                title: 'Region Classification',
                visible: false,
                sortable: true
              }, {
                field: 'OMBUID',
                title: 'Application ID',
                sortable: true,
                visible: false
              }
            ],
            data: $scope.bstData
          };
          bstSearchUtils.updateConfig($scope);
          $scope.$bstEl.bootstrapTable($scope.bsTableConfig);
          bstSearchUtils.handleSearchState($scope);
        });
      });
    }

    // Method to handle click events on ApplicationTIME table
    $('#timetable').on('click-row.bs.table', function(e, row, $element) {
      // note: this :has selector cannot be cached; done this way to get
      // around caching & DOM availabily issues
      if (!!$(
          '.bootstrap-table:not(:has(.dropdown-toggle[aria-expanded="true"]))'
        ).length) {
        var apppath = row.Id
        //      apppath = apppath.replace(/\//g , "-%")
        $location.path('/applications/' + apppath);
        $route.reload();
      }
    });

    // Method to create Systems table
    $scope.createSystemsTable = function() {
      $scope.$bstEl = $('#systemtable');
      $scope.hasUsedSearchForm = false;
      $scope.rootPath = '/systems';
      // Use the System 'query' method to send an appropriate GET request
      var systems = ParentSystemsSrc.query();
      $scope.system = systems[0];
      systems.$promise.then(function(populateData) {
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
    $('#systemtable').on('click-row.bs.table', function(e, row, $element) {
      // note: this :has selector cannot be cached; done this way to get
      // around caching & DOM availabily issues
      if (!!$(
          '.bootstrap-table:not(:has(.dropdown-toggle[aria-expanded="true"]))'
        ).length) {
        $location.path('/systems/' + row.Id);
        $route.reload();
      }
    });

    // Method for retrieving a single System's details
    $scope.createSysDetail = function() {
      $(function() {
        $('[data-toggle="tooltip"]').tooltip()
      });
      // Use the Application 'get' method to send an appropriate GET request
      var system = ParentSystemsSrc.query({
        id: $routeParams.id
      });
      var application = SysAppSrc.query({
        id: $routeParams.id
      });
      var sysid = '';
      system.$promise.then(function(populateData) {
        $.each(system, function(key, val) {
          $scope.sysId = val.Id;
          sysid = val.Id;
          $scope.sysName = val.Name;
          $scope.sysDescription = val.Description;
          $scope.sysURL = val.URL;
        });


        system.$promise.then(function() {
          $.each(system, function(key, sys) {
            if (sys.Id == $routeParams.id) {
              $scope.sysId = sys.Id;
              $scope.sysName = sys.Name;
              $scope.sysDescription = sys.Description;
              $scope.sysParent = sys.Parent;

              application.$promise.then(function() {

                var interfaces = InterfacesSrc.query({
                  sys: sys.Name
                });
                $scope.tempname = sys.Name;
                $scope.systype = 'sys';

                interfaces.$promise.then(function() {
                  $.each(application, function(i,
                    app) {
                    // if (app.Owner == org.Name)
                    //   {//org.DisplayName
                    $.each(interfaces, function(i,
                      iface) {
                      if (iface.AppID1 == app
                        .Id || iface.AppID2 ==
                        app.Id) {
                        d3.select(
                            "#interfaces-tab")
                          .style("display",
                            "block");
                      }
                    });
                    // };
                  });
                });
              });
            };
          });
        });


        var sysapp = SysAppSrc.query({
          id: $routeParams.id
        });
        sysapp.$promise.then(function(populateData) {

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
                field: 'Alias',
                title: 'Alias',
                sortable: true,
                visible: false
              }, {
                field: 'SSOShort',
                title: 'SSO',
                sortable: true
              }, {
                field: 'Owner',
                title: 'Two Letter Org (Long)',
                sortable: true,
                visible: false
              }, {
                field: 'CUI',
                title: 'CUI',
                sortable: true,
                visible: false
              }, {
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
              }, {
                field: 'TechnicalPOC',
                title: 'Technical POC',
                sortable: true,
                visible: false
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
                field: 'HostingProvider',
                title: 'Hosting Provider',
                sortable: true,
                visible: false
              }, {
                field: 'Cloud',
                title: 'Cloud',
                sortable: true,
                visible: false
              }, {
                field: 'TechnologyPlatform',
                title: 'Platform',
                sortable: true,
                visible: false
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
                title: 'FY17',
                visible: false
              }, {
                field: 'FY18',
                title: 'FY18',
                visible: false
              }, {
                field: 'FY19',
                title: 'FY19',
                visible: false
              }, {
                field: 'FY20',
                title: 'FY20',
                visible: false
              }, {
                field: 'FY21',
                title: 'FY21',
                visible: false
              }, {
                field: 'FY22',
                title: 'FY22',
                visible: false
              }, {
                field: 'FY23',
                title: 'FY23',
                visible: false
              }, {
                field: 'FY24',
                title: 'FY24',
                visible: false
              }, {
                field: 'FY25',
                title: 'FY25',
                visible: false
              }, {
                field: 'FY26',
                title: 'FY26',
                visible: false
              }, {
                field: 'Notes',
                title: 'Notes',
                visible: false
              }, {
                field: 'Status',
                title: 'Status',
                sortable: true
              }, {
                field: 'ProdYear',
                title: 'Production Year',
                sortable: true,
                visible: false
              }, {
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
              }, {
                field: 'OMBUID',
                title: 'Application ID',
                sortable: true,
                visible: false
              }
            ],
            data: sysapp //appgroup
            //});
          });
        });
      });
    }

    // Method to handle click events on the Child Applications table within a System's detail page
    $('#sysapptable').on('click-row.bs.table', function(e, row, $element) {
      // note: this :has selector cannot be cached; done this way to get
      // around caching & DOM availabily issues
      if (!!$(
          '.bootstrap-table:not(:has(.dropdown-toggle[aria-expanded="true"]))'
        ).length) {
        var apppath = row.Id;
        //     apppath = apppath.replace(/\//g , "-%")
        $location.path('/applications/' + apppath);
        $route.reload();
      }
    });

    // Method for retrieving a single application's details
    $scope.createAppDetail = function() {
      $(function() {
        $('[data-toggle="tooltip"]').tooltip()
      });

      var appId = $routeParams.applicationId,
        application = ApplicationsSrc.query({
          id: appId
        }),
        capabilities = AppCapabilitiesSrc.query({
          id: appId
        }),
        technologies = AppTechnologiesSrc.query({
          id: appId
        }),
        pocs = AppPOCsSrc.query({
          id: appId
        }),
        time = AppTIMESrc.query({
          id: appId
        }),
        interfaces = AppInterfacesSrc.query({
          id: appId
        }),
        interfacesv2 = AppInterfacesv2Src.query({
          id: appId
        });

      application.$promise.then(function(d) {
        // rule is multiple Links are single string, delimited with a comma
        if (!!application[0].Link && application[0].Link.indexOf(
            ',') > -1) {
          application[0].Link = application[0].Link.split(',');
        } else if (!!application[0].Link) {
          application[0].Link = [application[0].Link];
        } else {
          application[0].Link = [];
        }

        $scope.application = application[0];

        time.$promise.then(function() {
          $scope.time = time;
        });

        interfaces.$promise.then(function() {
          $.each(application, function(i, app) {
            $.each(interfaces, function(i, iface) {
              if (iface.AppID1 == app.Id || iface
                .AppID2 == app.Id) {
                d3.select("#interfaces-tab").style(
                  "display", "block");
              }
            });
            // };
          });
          $scope.interfaces = interfaces;

        });

        interfacesv2.$promise.then(function() {
          $.each(application, function(i, app) {
            $.each(interfacesv2, function(i, iface2) {
              if (iface2.srcAppID == app.Id || iface2
                .destAppID == app.Id) {
                d3.select("#interfacesv2-tab").style(
                  "display", "block");
              }
            });
            // };
          });
          $scope.interfacesv2 = interfacesv2;

        });

        pocs.$promise.then(function() {
          // $scope.pocs = pocs;
          $scope.pocs = pocs[0].POC;
          console.log($scope.pocs);
        });

        time.$promise.then(function() {
          $('#apptimetable').bootstrapTable({
            columns: [{
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
              title: 'FY17',
              visible: false
            }, {
              field: 'FY18',
              title: 'FY18'
            }, {
              field: 'FY19',
              title: 'FY19'
            }, {
              field: 'FY20',
              title: 'FY20'
            }, {
              field: 'FY21',
              title: 'FY21'
            }, {
              field: 'FY22',
              title: 'FY22',
              visible: false
            }, {
              field: 'FY23',
              title: 'FY23',
              visible: false
            }, {
              field: 'FY24',
              title: 'FY24',
              visible: false
            }, {
              field: 'FY25',
              title: 'FY25',
              visible: false
            }, {
              field: 'FY26',
              title: 'FY26',
              visible: false
            }, {
              field: 'TIME_Notes',
              title: 'Notes',
              // visible: false,
              sortable: true
            }, ],
            data: time
          });
        });

        capabilities.$promise.then(function() {
          $('#appcaptable').bootstrapTable({
            columns: [{
                field: 'ReferenceNum',
                title: 'Hierarchy number',
                //    sortable: true
              }, {
                field: 'Name',
                title: 'Business Capability',
                sortable: true
              }, {
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

        technologies.$promise.then(function() {
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
            }, {
              field: 'ProdYear',
              title: 'Production Year',
              sortable: true,
              visible: false
            }, {
              field: 'Category',
              title: 'Software Category',
              sortable: true,
              visible: false
            }, {
              field: 'Expiration',
              title: 'Approved Status Expiration Date',
              sortable: true,
              visible: false
            }, ],
            data: technologies
          });
        });

      });
    }

    // Method to handle click events on the related capabilities table within a Application's detail page
    $('#appcaptable').on('click-row.bs.table', function(e, row, $element) {
      // note: this :has selector cannot be cached; done this way to get
      // around caching & DOM availabily issues
      if (!!$(
          '.bootstrap-table:not(:has(.dropdown-toggle[aria-expanded="true"]))'
        ).length) {
        $location.path('/capabilities/' + row.Id);
        $route.reload();
      }
    });

    // Method to handle click events on the related standards table within a Application's detail page
    $('#apptechtable').on('click-row.bs.table', function(e, row, $element) {
      // note: this :has selector cannot be cached; done this way to get
      // around caching & DOM availabily issues
      if (!!$(
          '.bootstrap-table:not(:has(.dropdown-toggle[aria-expanded="true"]))'
        ).length) {
        $location.path('/itstandards/' + row.Id);
        $route.reload();
      }
    });


    $scope.createInterfaceSSOChart = function(appId, orgName, type) {

      // TODO: there are better ways filtering Interfaces. Let's choose one that isn't dependent on args like this. -mld
      var interfaces = null,
        CONTAINER_ID = 'interfacessochart',
        SVG_ID = 'interfacesvg';

      if (document.getElementById(SVG_ID)) {
        return false;
      }

      var data = [];

      if (appId && !orgName) {
        interfaces = AppInterfacesSrc.query({
          id: appId
        });
      } else if (!appId && orgName && type) {
        interfaces = InterfacesSrc.query({
          sys: orgName
        });
      } else if (!appId && orgName) {
        interfaces = InterfacesSrc.query({
          owner: orgName
        });
      } else {
        interfaces = InterfacesSrc.query();
      }

      $scope.interfaces = interfaces;
      interfaces.$promise.then(function(populateData) {
        $.each(interfaces, function(key, val) {
          if (val.System1 == null)
            val.System1 = 'None';
          if (val.System2 == null)
            val.System2 = 'None';

          data.push({
            "AppID1": val.AppID1,
            "AppID2": val.AppID2,
            "Name1": val.Name1,
            "Name2": val.Name2,
            "NameShort1": val.NameShort1,
            "NameShort2": val.NameShort2,
            "SSO1": val.SSO1,
            "SSO2": val.SSO2,
            "SSOShort1": val.SSOShort1,
            "SSOShort2": val.SSOShort2,
            "Owner1": val.Owner1,
            "Owner2": val.Owner2,
            "OwnerShort1": val.OwnerShort1,
            "OwnerShort2": val.OwnerShort2,
            "System1": val.System1,
            "System2": val.System2,
            "count": 1,

          })
        })
        //Constants for the SVG
        var w = $('#' + CONTAINER_ID).parents('.panel-body').width(),
          h = 650;

        // Because sometimes in IE, $.width() returns 0
        if (!w) {
          w = 930; // best fit @1280px screen width in IE11
        }
        var mpr = chordMpr(data);

        mpr
          .addValuesToMap("NameShort1")

          .setFilter(function(row, a, b) {
            return (row.NameShort1 === a.name && row.NameShort2 ===
              b.name);
          })
          .setAccessor(function(recs, a, b) {
            if (!recs[0]) return 0;
            return +recs[0].count;
          });

        drawChords(mpr.getMatrix(), mpr.getMap(), type);

        //	})
        function drawChords(matrix, mmap, type) {

          var r1 = h / 2,
            r0 = 0.6 * r1;

          var color = d3.scale.category20b();
          var fill = d3.scale.ordinal()
            .range(['#6b6ecf', '#b5cf6b', '#e7ba52', '#d6616b',
              '#de9ed6', '#393b79', '#637939', '#8c6d31', '#843c39',
              '#7b4173', '#ce6dbd', '#9c9ede', '#cedb9c', '#e7cb94',
              '#e7969c', '#5254a3', '#8ca252', '#bd9e39', '#ad494a',
              '#a55194',
            ])

          var chord = d3.layout.chord()
            .sortSubgroups(d3.descending)
            .sortChords(d3.descending);

          var mmapsize = mpr.size(mmap);
          if (mmapsize <= 6) {
            chord.padding(4 / mmapsize);
          } else {
            chord.padding(.02);
          }

          var arc = d3.svg.arc()
            .innerRadius(r0)
            .outerRadius(r0 + 15);


          var svg = d3.select('#' + CONTAINER_ID).append("svg")
            .attr("width", w)
            .attr("height", h)
            .attr("id", SVG_ID)
            .append("svg:g")
            //            .attr("id", "circle")
            .attr("transform", "translate(" + w / 2 + "," + h / 2 +
              ")");

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
            .on("mouseout", function(d) {
              d3.select("#tooltip1").style("visibility", "hidden")
            })
            .on("click", mouseclick);


          g.append("svg:path")
            .style("stroke", "black")
            .style("fill", function(d) {
              if (type === 'sys')
                return fill(rdr(d).gsystem);
              else
                return fill(rdr(d).gownershort);
            }) //d.index  //group color control, colored by owner 2 letter office
            .attr("d", arc);

          g.append("svg:text")
            .each(function(d) {
              d.angle = (d.startAngle + d.endAngle) / 2;
            })
            .attr("dy", ".35em")
            .style("font-family", "helvetica, arial, sans-serif")
            .style("font-size", "10px")
            .style("font-weight", "bold")
            .attr("text-anchor", function(d) {
              return d.angle > Math.PI ? "end" : null;
            })
            .attr("transform", function(d) {
              return "rotate(" + (d.angle * 180 / Math.PI - 90) +
                ")" +
                "translate(" + (r0 + 21) + ")" +
                (d.angle > Math.PI ? "rotate(180)" : "");
            })
            .text(function(d) {
              return rdr(d).gname;
            });


          //Insert Legend
          var legend = svg.selectAll(".legend")

            .data(fill.domain())
            .enter().append("g")
            .attr("class", "legend")
            .attr("transform", function(d, i) {
              return "translate( 0," + (i * 17 - h / 2 + 30) + ")";
            }); //"translate(" + w / 6 + "," + h / 4 + ")"  " + (- w/15) + "


          legend.append("rect")
            .attr("x", w / 2 - 45)
            .attr("width", 13)
            .attr("height", 14)
            .style("fill", fill);

          legend.append("text")
            .attr("x", w / 2 - 50)
            .attr("y", 8)
            .attr("dy", ".25em")
            .style("font-size", "14px")
            .style("font-weight", "bold")
            .style("text-anchor", "end")
            .text(function(d) {
              return d;
            });

          var legendtitle;
          if (type === 'sys')
            legendtitle = 'Related System';
          else
            legendtitle = 'Organization';

          svg.append("text")
            .attr("transform", function(d, i) {
              return "translate( 0," + (-h / 2 + 30) + ")";
            })
            .attr("x", w / 2 - 45)
            .attr("y", -15)
            .style("font-size", "16px")
            .style("font-weight", "bold")
            .style("text-anchor", "end")
            .text(legendtitle);


          var chordPaths = svg.selectAll("path.chord")
            .data(chord.chords())
            .enter().append("svg:path")
            .attr("class", "chord")
            .style("stroke-opacity", .4) // set the stroke opacity
            .style("stroke",
              "#3182bd"
            ) // set the line colour, #3182bd seems GSA Blue
            .style("fill", "#c6dbef") // set the fill colour
            .attr("d", d3.svg.chord().radius(r0))
            .on("mouseover", function(d) {
              d3.select("#tooltip1")
                .style("visibility", "visible")
                .html(chordTip(rdr(
                  d))) //controls whether the tips are moving or not
                .style("top", function() {
                  return (d3.event.y - 100) + "px"
                }) //d3.event.pageY - 100
                .style("left", function() {
                  return (d3.event.x - 80) + "px";
                }) //d3.event.pageX-w/2
            })
            .on("mouseout", function(d) {
              d3.select("#tooltip1").style("visibility", "hidden")
            });

          g.attr("transform", "translate(-80,0)");
          chordPaths.attr("transform", "translate(-80,0)");

          function chordTip(d) {
            var p = d3.format(".2%"),
              q = d3.format(",.1r")
            return "Interface Data:<br/>" +
              "Coming soon..."
          }

          function groupTip(d) {
            var p = d3.format(".1%"),
              q = d3.format(",.1r")
            return "Application Information:<br/>" +
              "Name: " + d.gnamelong + " <br/>" +
              "Owner: " + d.gowner + " <br/>"
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
              .style("top", function() {
                return (d3.event.y - 80) + "px"
              }) //d3.event.pageY
              .style("left", function() {
                return (d3.event.x - 80) + "px";
              }) //d3.event.pageX

            chordPaths.classed("fade", function(p) {
              return p.source.index != i &&
                p.target.index != i;
            });
          }
        }

      })
    }

    /**Applciation interfaces, Sankey Diagram (interfacesv2)**/
    $scope.createInterfacev2 = function(appId) {
      var interfacesv2 = AppInterfacesv2Src.query({
        id: appId
      });
      $scope.interfacesv2 = interfacesv2;
      // var interfacesv2 = $scope.interfacesv2;
      var data = [];
      interfacesv2.$promise.then(function(populateData) {
        $.each(interfacesv2, function(key, val) {
          data.push({
            "sourceid": val.srcAppID,
            "targetid": val.destAppID,
            "source": val.srcApp,
            "target": val.destApp,
            "count": val.Count,
            "PII": val.PII,
          })
        })

        var CONTAINER_ID = 'interfacesankey',
          SVG_ID = 'interfacev2svg';
        if (document.getElementById(SVG_ID)) {
          return false;
        }
        var units = "PII Information";

        var w = $('#' + CONTAINER_ID).parents('.panel-body').width(),
          h = 650;

        // Because sometimes in IE, $.width() returns 0
        if (!w) {
          w = 930; // best fit @1280px screen width in IE11
        }

        var margin = {
            top: 5,
            right: (0.13 * w),
            bottom: 5,
            left: (0.13 * w)
          },
          width = (w - margin.left - margin.right) * 0.9, //700
          height = (h - margin.top - margin.bottom) * 0.9; //300


        var formatNumber = d3.format(",.0f"), // zero decimal places
          format = function(d) {
            return formatNumber(d) + " " + units;
          },
          // color = d3.scale.category20b();
          color = d3.scale.ordinal()
          .range(['#9dc6d8', '#00b3ca', '#7dd0b6', '#1d4e89',
            '#d2b29b', '#e38690', '#f69256', '#ead98b', '#965251',
            '#c6cccc', '#e5dfef', '#fbdce0', '#cbefe7', '#fffdce',
            '#d7ffdd',
          ]);

        // append the svg canvas to the page
        var svg = d3.select('#' + CONTAINER_ID)
          .on("touchstart", nozoom)
          .on("touchmove", nozoom)
          .append("svg")
          .attr("preserveAspectRatio", "xMinYMid meet")
          .attr("width", w) //width + margin.left + margin.right)
          .attr("height", h) //height + margin.top + margin.bottom)
          .attr("id", SVG_ID)
          .append("g")
          .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

        //			svg.append(SVG_ID);

        // Set the sankey diagram properties
        var sankey = d3.sankey()
          .nodeWidth(26)
          .nodePadding(30)
          .size([width, height]);

        var path = sankey.link();


        // load the data
        //set up graph in same style as original example but empty
        var graph = {
          "nodes": [],
          "links": []
        };
        var nodes_k = [];

        data.forEach(function(d) {
          // graph.nodes.push({ "name": d.source });
          graph.nodes.push({
            "name": d.source,
            "id": d.sourceid
          });
          // graph.nodes.push({ "name": d.target });
          graph.nodes.push({
            "name": d.target,
            "id": d.targetid
          });
          graph.links.push({
            "source": d.source,
            "target": d.target,
            "sourceid": d.sourceid,
            "targetid": d.targetid,
            "value": +d.count,
            "info": d.PII
          });
        });

        // return only the distinct / unique nodes
        graph.nodes = d3.entries(d3.nest()
          .key(function(d) {
            return d.name;
          })
          .map(graph.nodes));

        /* 			 graph.links = d3.entries(d3.nest()
                       .key(function (d) { return d.source + d.target; })
                       .map(graph.links)); */

        //for graph.link to find the link
        graph.nodes.forEach(function(d, i) {
          nodes_k.push(d.key);
        });

        // loop through each link replacing the text with its index from node
        graph.links.forEach(function(d, i) {
          graph.links[i].source = nodes_k.indexOf(graph.links[i]
            .source);
          graph.links[i].target = nodes_k.indexOf(graph.links[i]
            .target);
        });

        graph.links.sort(function(a, b) {
          return (a.source <= b.source) && (a.target <= b.target)
        });
        //now loop through each nodes to make nodes an array of objects
        // rather than an array of strings
        graph.nodes.forEach(function(d, i) {
          // graph.nodes[i] = { "name": d };
          graph.nodes[i] = {
            "name": d.key,
            "id": d.value[0].id
          };
        });

        sankey
          .nodes(graph.nodes)
          .links(graph.links)
          // Note here: if input data has a loop, the program will hang here!
          .layout(32);

        // add in the links
        var link = svg.append("g").selectAll(".link")
          .data(graph.links)
          .enter().append("path")
          .attr("class", "links")
          .attr("d", path)
          .style("fill", "none"
            /* function(d) {
				   return d.color = color(d.info); } */
          ) //.replace(/ .*/, "")
          .style("stroke", function(d) {
            return d.color = color(d.info);
          }) //d3.rgb(d.color).brighter(1); })
          .style("stroke-opacity", 0.7)
          .style("stroke-width", function(d) {
            return Math.max(1, d.dy);
          });
        //.sort(function(a, b) { return b.dy - a.dy; });

        link.filter(function(d) {
            return !d.causesCycle
          })
          .style("stroke-width", function(d) {
            return Math.max(1, d.dy);
          });

        // add the link titles
        link.append("title")
          .text(function(d) {
            return d.source.name + " → " +
              d.target.name + "\n" +
              format(d.value) + "\n" +
              d.info;
          });

        // add in the nodes
        var node = svg.append("g").selectAll(".node")
          .data(graph.nodes)
          .enter().append("g")
          .attr("class", "node")
          .attr("transform", function(d) {
            return "translate(" + d.x + "," + d.y + ")";
          })
          .on("click", mouseclick)
          .call(d3.behavior.drag()
            .origin(function(d) {
              return d;
            })
            //  .on("dragstart", function() {
            //	  this.parentNode.appendChild(this); })
            .on("drag", dragmove));

        // add the rectangles for the nodes
        node.append("rect")
          .attr("height", function(d) {
            return d.dy;
          })
          .attr("width", sankey.nodeWidth())
          .style("fill", "#36648b")
          //.style("stroke", "#104e8b")
          .attr('fill-opacity', 0.9)
          // .style("fill", function(d) {
          // return d.color = color(d.name.replace(/ .*/, "")); })
          // .style("stroke", function(d) {
          // return d3.rgb(d.color).darker(2); })
          .append("title")
          .text(function(d) {
            return d.name + "\n" + format(d.value);
          });

        // add in the title for the nodes
        node.append("text")
          .attr("x", -6)
          .attr("y", function(d) {
            return d.dy / 2;
          })
          .attr("dy", ".35em")
          .style("font-family", "helvetica, arial, sans-serif")
          .style("font-size", "10px")
          .style("font-weight", "bold")
          .attr("text-anchor", "end")
          .attr("transform", null)
          .text(function(d) {
            return d.name;
          })
          .filter(function(d) {
            return d.x < width / 2;
          })
          .attr("x", 6 + sankey.nodeWidth())
          .attr("text-anchor", "start");

        // the function for moving the nodes, both vertically and horizontally
        function dragmove(d) {
          d[0] = d3.event.x, d[1] = d3.event.y;
          if (this.nextSibling) this.parentNode.appendChild(this);
          d3.select(this).attr("transform",
            "translate(" + (
              d.x = Math.max(0, Math.min(width - d.dx, d3.event.x))
            ) + "," + (
              d.y = Math.max(0, Math.min(height - d.dy, d3.event.y))
            ) + ")");
          sankey.relayout();
          link.attr("d", path);
        }

        function mouseclick(d) {
          if (d3.event.defaultPrevented) return; // dragged
          // if( d3.select(this).attr("data-clicked") == "1" ){
          // d3.select(this).attr("data-clicked","0");
          var appid = d.id;
          window.location = window.location.pathname + (
            '#!/applications/' + appid);
          // }
          // else{
          // d3.select(this).attr("data-clicked","1");
          //}
          //	$scope.$apply();
        }

        function nozoom() {
          d3.event.preventDefault();
        }

        // I need to learn javascript
        var numCycles = 0;
        for (var i = 0; i < sankey.links().length; i++) {
          if (sankey.links()[i].causesCycle) {
            numCycles++;
          }
        }
        //var cycleTopMarginSize = -10;
        //var horizontalMarginSize = 5;
        // var cycleTopMarginSize = (sankey.cycleLaneDistFromFwdPaths() -
        // ( (sankey.cycleLaneNarrowWidth() + sankey.cycleSmallWidthBuffer() ) * numCycles ) )
        // var horizontalMarginSize = ( sankey.cycleDistFromNode() + sankey.cycleControlPointDist() );

        svg = d3.select('#' + CONTAINER_ID).select("svg")
        /* .attr( "viewBox",
           "" + (0 - horizontalMarginSize ) + " "         // left
           + cycleTopMarginSize + " "                     // top
           + (w + horizontalMarginSize * 2 ) + " "     // width
           + (h + (-1 * cycleTopMarginSize)) + " " );  // height
            */
        //Insert Legend
        var legend = svg.selectAll(".legend")

          .data(color.domain())
          .enter().append("g")
          .attr("class", "legend")
          .attr("transform", function(d, i) {
            return "translate( 0," + i * 15 + ")";
          }); //"translate(" + w / 6 + "," + h / 4 + ")"  " + (- w/15) + "


        legend.append("rect")
          .attr("x", w - 15)
          .attr("width", 12)
          .attr("height", 12)
          .style("fill", color);

        legend.append("text")
          .attr("x", w - 20)
          .attr("y", 8)
          .attr("dy", ".35em")
          .style("font-size", "12px")
          .style("font-weight", "bold")
          .style("text-anchor", "end")
          .text(function(d) {
            return d;
          });


      });
    }
  }
]);
