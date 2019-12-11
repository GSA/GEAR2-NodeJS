/* eslint-disable */

// Invoke 'strict' JavaScript mode
'use strict';

// Create the 'business' controller
angular.module('dashboard').controller('SearchController', ['$route', '$scope', '$http', '$routeParams', '$filter', '$location', '$sce', '$window',
    'ApplicationsSrc', 'SearchSrc', 'ApplicationsRetired', 'AppCapabilitiesSrc', 'AppTechnologiesSrc', 'AppPOCsSrc', 'ParentSystemsSrc', 'SysAppSrc', 'InterfacesSrc', 'AppInterfacesSrc', 'AppInterfacesv2Src', 'OrgInterfacesSrc',
    'System', 'AppTIMESrc', 'AppTechMap', 'ITStandard', 'FuncAppMap', 'BusFunction', 'Interface', 'FISMA', 'bstSearchUtils',
    function ($route, $scope, $http, $routeParams, $filter, $location, $sce, $window,
              ApplicationsSrc, SearchSrc, ApplicationsRetired, AppCapabilitiesSrc, AppTechnologiesSrc, AppPOCsSrc, ParentSystemsSrc, SysAppSrc, InterfacesSrc, AppInterfacesSrc, AppInterfacesv2Src, OrgInterfacesSrc,
              System, AppTIMESrc, AppTechMap, ITStandard, FuncAppMap, BusFunction, Interface, FISMA, bstSearchUtils) {
        $scope.rootPath = '';
        $scope.bstData = [];
        $scope.$bstEl = null;
        $scope.bstFilter = {};
        $scope.tableFilterList = [];
        $scope.hasUsedSearchForm = false;


        // Method to create Applications table
        $scope.createSearchTable = function () {

            $scope.$bstEl = $('#searchtable');
            $scope.hasUsedSearchForm = false;
            $scope.rootPath = '/search';

            console.log('query params', $routeParams);

            var applications = SearchSrc.query({kw: $routeParams.kw});

            $scope.applications = applications;
            applications.$promise.then(function (populateData) {
                $.each(applications, function (key, val) {

                    $scope.bstData.push({
                        "Name": val.Keyname,
                        "Description": val.Description,
                        "Type": val.GEAR_Type,
                        "Id": val.Id
                    });
                });


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
                            field: 'Description',
                            title: 'Description',
                            sortable: true
                        },
                        {
                            field: 'Type',
                            title: 'Type',
                            sortable: true
                        }
                    ],
                    data: $scope.bstData
                };


                // Initialize Bootstrap Table plugin
                $scope.$bstEl.bootstrapTable($scope.bsTableConfig);


            });
        };

        $('#searchtable').on('click-row.bs.table', function (e, row, $element) {
            // note: this :has selector cannot be cached; done this way to get
            // around caching & DOM availabily issues
            console.log($element);
            if (!!$('.bootstrap-table:not(:has(.dropdown-toggle[aria-expanded="true"]))').length) {
                let apppath;
                console.log('type', row.Type);
                switch (row.Type) {
                    case 'Application':
                        apppath = '/applications/' + row.Id;
                        break;
                    case 'Technology':
                        apppath = '/itstandards/' + row.Id;
                        break;
                    case 'FISMA':
                        apppath = '/FISMA/' + row.Id;
                        break;
                    case 'Capability':
                        apppath = '/capabilities/' + row.Id;
                        break;
                    case 'Investment':
                        apppath = '/investment/' + row.Id;
                        break;
                    case 'System':
                        apppath = '/systems/' + row.Id;
                        break;
                    default:
                        apppath = '/'
                }
                $location.path(apppath);
                $route.reload();
            }
        });
    }
]);