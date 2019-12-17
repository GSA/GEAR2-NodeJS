/* eslint-disable */

// Invoke 'strict' JavaScript mode
'use strict';

// Create the 'business' controller
angular.module('dashboard').controller('GlossaryController', ['$route', '$scope', '$http', '$routeParams', '$filter', '$location', '$sce', '$window', 'ApplicationsSrc', 'AccessFormsSrc', 'GlossarySrc', 'ApplicationsRetired', 'AppCapabilitiesSrc', 'AppTechnologiesSrc', 'AppPOCsSrc', 'ParentSystemsSrc', 'SysAppSrc', 'InterfacesSrc', 'AppInterfacesSrc', 'AppInterfacesv2Src', 'OrgInterfacesSrc', 'System', 'AppTIMESrc', 'AppTechMap', 'ITStandard', 'FuncAppMap', 'BusFunction', 'Interface', 'FISMA', 'bstSearchUtils',
  function($route, $scope, $http, $routeParams, $filter, $location, $sce, $window, ApplicationsSrc, AccessFormsSrc, GlossarySrc, SearchSrc, ApplicationsRetired, AppCapabilitiesSrc, AppTechnologiesSrc, AppPOCsSrc, ParentSystemsSrc, SysAppSrc, InterfacesSrc, AppInterfacesSrc, AppInterfacesv2Src, OrgInterfacesSrc, System, AppTIMESrc, AppTechMap, ITStandard, FuncAppMap, BusFunction, Interface, FISMA, bstSearchUtils) {
    $scope.rootPath = '';
    $scope.bstData = [];
    $scope.$bstEl = null;
    $scope.bstFilter = {};
    $scope.tableFilterList = [];
    $scope.hasUsedSearchForm = false;


    // Method to create Applications table
    $scope.createGlossaryTable = function() {

      $scope.$bstEl = $('#glossarytable');
      $scope.hasUsedSearchForm = false;

      var applications = GlossarySrc.query();

      $scope.applications = applications;
      applications.$promise.then(function(populateData) {
        $.each(applications, function(key, val) {

          $scope.bstData.push({
            "Name": val.Term,
            "Definition": val.Definition
          });
        });


        // Bootstrap Table config obj on $scope so we can decouple from
        // init call and mutate options/properties a little more cleanly
        $scope.bsTableConfig = {
          columns: [{
              field: 'Name',
              title: 'Term',
              sortable: true
            },
            {
              field: 'Definition',
              title: 'Definition',
              sortable: true
            }
          ],
          data: $scope.bstData
        };


        // Initialize Bootstrap Table plugin
        $scope.$bstEl.bootstrapTable($scope.bsTableConfig);


      });
    };


    $scope.createFormsTable = function() {

      $scope.$bstEl = $('#formstable');
      $scope.hasUsedSearchForm = false;

      var applications = AccessFormsSrc.query();
      let iconHtml = '<span class="fa fa-external-link"></span> ';

      $scope.applications = applications;
      applications.$promise.then(function(populateData) {
        $.each(applications, function(key, val) {

          $scope.bstData.push({
            "Title": val.Title,
            "Description": val.Description,
            "POC": val.POC,
            "Link": val.Link
          });
        });


        // Bootstrap Table config obj on $scope so we can decouple from
        // init call and mutate options/properties a little more cleanly
        $scope.bsTableConfig = {
          columns: [{
              field: 'Title',
              title: 'Title ' + iconHtml,
              icon: 'fa fa-external-link',
              sortable: true
            },
            {
              field: 'Description',
              title: 'Description ' + iconHtml,
              sortable: true
            },
            {
              field: 'POC',
              title: 'POC ' + iconHtml,
              sortable: true
            }
          ],
          data: $scope.bstData
        };


        // Initialize Bootstrap Table plugin
        $scope.$bstEl.bootstrapTable($scope.bsTableConfig);


      });
    };

    $('#formstable').on('click-row.bs.table', function(e, row, $element) {
      console.log('link', row);
      // note: this :has selector cannot be cached; done this way to get
      // around caching & DOM availabily issues
      if (!!$('.bootstrap-table:not(:has(.dropdown-toggle[aria-expanded="true"]))').length) {
        let apppath = row.Link;
        $window.open(apppath, '_blank');
      }
    });
  }
]);
