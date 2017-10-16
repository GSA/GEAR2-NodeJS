/* eslint-disable */

// Invoke 'strict' JavaScript mode
'use strict';

// Create the 'Security' controller
angular.module('dashboard').controller('SecurityController', ['$route','$scope', '$http', '$routeParams', '$filter', '$location', '$sce',
'FISMASrc', 'FISMAexpSrc', 'FISMAexp1Src', 'FISMAexp2Src', 'FISMAPOCsSrc', 'POCSrc', 'FISMAAppsSrc', 'FISMAApplicationsSrc',
'FISMAPOC', 'bstSearchUtils',
function ($route, $scope, $http, $routeParams, $filter, $location, $sce,
  FISMASrc, FISMAexpSrc, FISMAexp1Src, FISMAexp2Src, FISMAPOCsSrc,  POCSrc, FISMAAppsSrc, FISMAApplicationsSrc,
  FISMAPOC, bstSearchUtils) {
    $scope.rootPath = '';
    $scope.bstData = [];
    $scope.$bstEl = null;
    $scope.bstFilter = {};
    $scope.tableFilterList = [];
    $scope.hasUsedSearchForm = false;

    // Method for Fisma Systems table
    $scope.createFISMATable = function () {
      $scope.$bstEl = $('#fismatable');
      $scope.hasUsedSearchForm = false;
      $scope.rootPath = '/FISMA';

      var fsystems = FISMASrc.query();
      fsystems.$promise.then(function (populateData) {
        $scope.bstData = [];
        var art = "";
        var link = "";
        $.each(fsystems, function (key, val) {
/*           var artifacts = [];

          _.each(val.RelatedArtifacts, function (artifact) {
            artifacts.push('<a class="no-propagation" target="_blank" href="' +
            artifact.ReferenceDocuments +  '">' + artifact.Name + '</a>');
          });

          art = val.RelatedArtName;
          link = val.RelatedArtURL; */
          $scope.bstData.push({
            "RelOrgDisplayName" : val.RelOrgDisplayName,
            "Name" : val.Name,
            "Id" : val.Id,
            "FedContractorLoc" : val.FedContractorLoc,
            "FIPS199" : val.FIPS199,
            "ATODate" : val.ATODate,
            "ATOType" : val.ATOType,
            "RenewalDate" : val.RenewalDate,
            "ComplFISMA" : val.ComplFISMA,
            "FISMASystemIdentifier" : val.FISMASystemIdentifier,
			"PII": val.PII,
			"CloudYN": val.CloudYN,
			"CSP": val.CSP,
			"ServiceType": val.ServiceType,
            "Artifacts": val.RelatedArtifacts//artifacts.join(',<br/>')
          });
        });
        bstSearchUtils.checkFilterState($scope);
        $scope.bsTableConfig = {
          columns: [{
            field: 'RelOrgDisplayName',
            title: 'Responsible Org',
            sortable: true
          }, {
            field: 'Name',
            title: 'System Name',
            sortable: true
          }, {
            field: 'FedContractorLoc',
            title: 'Federal/Contractor',
            sortable: true,
            visible: false
          }, {
            field: 'FIPS199',
            title: 'FIPS Impact Level',
            sortable: true,
            visible: false
          }, {
            field: 'ATODate',
            title: 'ATO Date',
            sortable: true
          }, {
            field: 'ATOType',
            title: 'ATO Type',
            sortable: true
          }, {
            field: 'RenewalDate',
            title: 'Renewal Date',
            sortable: true
          }, {
            field: 'ComplFISMA',
            title: 'Complete Assessment For Current FY',
            sortable: true,
            visible: false
          }, {
            field: 'PII',
            title: 'PII',
            sortable: true,
            visible: false
          },{
            field: 'CloudYN',
            title: 'Cloud Hosted?',
            sortable: true,
            visible: false
          },{
            field: 'CSP',
            title: 'Cloud Server Provider',
            sortable: true,
            visible: false
          },{
            field: 'ServiceType',
            title: 'Type of Service',
            sortable: true,
            visible: false
          },{
            field: 'Artifacts',
            title: 'Related Artifacts'
          },
          // {
          // field: 'Id',
          // title: 'Id',
          // sortable: false,
          // visible: false
          // },
          {
            field: 'FISMASystemIdentifier',
            title: 'FISMA System Identifier',
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

    $('#fismatable')
    .on('click-cell.bs.table', function (e, field, value, row, $element) {
      // note: this :has selector cannot be cached as a jQuery selection;
      // done this way to get around that caching issues & other DOM
      // availabily issues
      // ALSO: bs-table plugin captures events and prevents propagation
      // from inner children to bubble back up. The only solution so
      // far is to explicitly exclude by column name
      if ((!!$('.bootstrap-table:not(:has(.dropdown-toggle[aria-expanded="true"]))').length)
      && field !== 'Artifacts') {
        $location.path('/FISMA/' + row.Id);
        $scope.$apply();
      }
    });

    // Method for Fisma Expired Systems table
    $scope.createFISMAexpTable = function () {
      $scope.$bstEl = $('#fismaexptable');
      $scope.hasUsedSearchForm = false;
      $scope.rootPath = '/FISMAexp';

      var fsystems = FISMAexpSrc.query();
      fsystems.$promise.then(function (populateData) {
        $scope.bstData = [];
        var art = "";
        var link = "";
        $.each(fsystems, function (key, val) {
  /*         var artifacts = [];

          _.each(val.RelatedArtifacts, function (artifact) {
            artifacts.push('<a class="no-propagation" target="_blank" href="' +
            artifact.ReferenceDocuments +  '">' + artifact.Name + '</a>');
          });

          art = val.RelatedArtName;
          link = val.RelatedArtURL; */
          $scope.bstData.push({
            "RelOrgDisplayName" : val.RelOrgDisplayName,
            "Name" : val.Name,
            "Id" : val.Id,
            "FedContractorLoc" : val.FedContractorLoc,
            "FIPS199" : val.FIPS199,
            "ATODate" : val.ATODate,
            "ATOType" : val.ATOType,
            "RenewalDate" : val.RenewalDate,
            "ComplFISMA" : val.ComplFISMA,
            "FISMASystemIdentifier" : val.FISMASystemIdentifier,
			"InactiveDate" : val.InactiveDate,
			"PII": val.PII,
			"CloudYN": val.CloudYN,
			"CSP": val.CSP,
			"ServiceType": val.ServiceType,
            "Artifacts": val.RelatedArtifacts // artifacts.join(',<br/>')
          });
        });
        bstSearchUtils.checkFilterState($scope);
        $scope.bsTableConfig = {
          columns: [{
            field: 'Name',
            title: 'System Name',
            sortable: true
          }, {
            field: 'RelOrgDisplayName',
            title: 'Responsible Org',
            sortable: true
          }, {
            field: 'FedContractorLoc',
            title: 'Federal/Contractor',
            sortable: true,
            visible: false
          }, {
            field: 'FIPS199',
            title: 'FIPS Impact Level',
            sortable: true,
            visible: false
          }, {
            field: 'ATODate',
            title: 'ATO Date',
            sortable: true
          }, {
            field: 'ATOType',
            title: 'ATO Type',
            sortable: true
          }, {
            field: 'RenewalDate',
            title: 'Renewal Date',
            sortable: true,
			visible: false
          }, {
            field: 'ComplFISMA',
            title: 'Complete Assessment For Current FY',
            sortable: true,
            visible: false
          }, {
            field: 'PII',
            title: 'PII',
            sortable: true,
            visible: false
          },{
            field: 'CloudYN',
            title: 'Cloud Hosted?',
            sortable: true,
            visible: false
          },{
            field: 'CSP',
            title: 'Cloud Server Provider',
            sortable: true,
            visible: false
          },{
            field: 'ServiceType',
            title: 'Type of Service',
            sortable: true,
            visible: false
          },{
            field: 'Artifacts',
            title: 'Related Artifacts',
			visible: false
          },
          {
            field: 'FISMASystemIdentifier',
            title: 'FISMA System Identifier',
            sortable: true,
            visible: false
          },
		  {
			field: 'InactiveDate',
			title: 'Inactive Date',
			sortable: true,
			visible: true
		  }],
          data: $scope.bstData
        };
        bstSearchUtils.updateConfig($scope);
        $scope.$bstEl.bootstrapTable($scope.bsTableConfig);
        bstSearchUtils.handleSearchState($scope);

      });
    }

    $('#fismaexptable')
    .on('click-cell.bs.table', function (e, field, value, row, $element) {
      // note: this :has selector cannot be cached as a jQuery selection;
      // done this way to get around that caching issues & other DOM
      // availabily issues
      // ALSO: bs-table plugin captures events and prevents propagation
      // from inner children to bubble back up. The only solution so
      // far is to explicitly exclude by column name
      if ((!!$('.bootstrap-table:not(:has(.dropdown-toggle[aria-expanded="true"]))').length)
      && field !== 'Artifacts') {
        $location.path('/FISMA/' + '-' + row.Id);
        $scope.$apply();
      }
    });
	
    // Method for Fisma Expired1 Systems table
    $scope.createFISMAexp1Table = function () {
      $scope.$bstEl = $('#fismaexp1table');
      $scope.hasUsedSearchForm = false;
      $scope.rootPath = '/FISMAexp1';

      var fsystems = FISMAexp1Src.query();
      fsystems.$promise.then(function (populateData) {
        $scope.bstData = [];
        var art = "";
        var link = "";
        $.each(fsystems, function (key, val) {
/*           var artifacts = [];

          _.each(val.RelatedArtifacts, function (artifact) {
            artifacts.push('<a class="no-propagation" target="_blank" href="' +
            artifact.ReferenceDocuments +  '">' + artifact.Name + '</a>');
          });

          art = val.RelatedArtName;
          link = val.RelatedArtURL; */
          $scope.bstData.push({
            "RelOrgDisplayName" : val.RelOrgDisplayName,
            "Name" : val.Name,
            "Id" : val.Id,
            "FedContractorLoc" : val.FedContractorLoc,
            "FIPS199" : val.FIPS199,
            "ATODate" : val.ATODate,
            "ATOType" : val.ATOType,
            "RenewalDate" : val.RenewalDate,
            "ComplFISMA" : val.ComplFISMA,
            "FISMASystemIdentifier" : val.FISMASystemIdentifier,
			"InactiveDate" : val.InactiveDate,
			"PII": val.PII,
			"CloudYN": val.CloudYN,
			"CSP": val.CSP,
			"ServiceType": val.ServiceType,
            "Artifacts": val.RelatedArtifacts //artifacts.join(',<br/>')
          });
        });
        bstSearchUtils.checkFilterState($scope);
        $scope.bsTableConfig = {
          columns: [{
            field: 'Name',
            title: 'System Name',
            sortable: true
          }, {
            field: 'RelOrgDisplayName',
            title: 'Responsible Org',
            sortable: true
          }, {
            field: 'FedContractorLoc',
            title: 'Federal/Contractor',
            sortable: true,
            visible: false
          }, {
            field: 'FIPS199',
            title: 'FIPS Impact Level',
            sortable: true,
            visible: false
          }, {
            field: 'ATODate',
            title: 'ATO Date',
            sortable: true
          }, {
            field: 'ATOType',
            title: 'ATO Type',
            sortable: true
          }, {
            field: 'RenewalDate',
            title: 'Renewal Date',
            sortable: true
          }, {
            field: 'ComplFISMA',
            title: 'Complete Assessment For Current FY',
            sortable: true,
            visible: false
          }, {
            field: 'PII',
            title: 'PII',
            sortable: true,
            visible: false
          },{
            field: 'CloudYN',
            title: 'Cloud Hosted?',
            sortable: true,
            visible: false
          },{
            field: 'CSP',
            title: 'Cloud Server Provider',
            sortable: true,
            visible: false
          },{
            field: 'ServiceType',
            title: 'Type of Service',
            sortable: true,
            visible: false
          },{
            field: 'Artifacts',
            title: 'Related Artifacts'
          },
          {
            field: 'FISMASystemIdentifier',
            title: 'FISMA System Identifier',
            sortable: true,
            visible: false
          },
		  {
			field: 'InactiveDate',
			title: 'Inactive Date',
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

    $('#fismaexp1table')
    .on('click-cell.bs.table', function (e, field, value, row, $element) {
      // note: this :has selector cannot be cached as a jQuery selection;
      // done this way to get around that caching issues & other DOM
      // availabily issues
      // ALSO: bs-table plugin captures events and prevents propagation
      // from inner children to bubble back up. The only solution so
      // far is to explicitly exclude by column name
      if ((!!$('.bootstrap-table:not(:has(.dropdown-toggle[aria-expanded="true"]))').length)
      && field !== 'Artifacts') {
        $location.path('/FISMA/' + row.Id);
        $scope.$apply();
      }
    });
	
    // Method for Fisma Expired2 Systems table
    $scope.createFISMAexp2Table = function () {
      $scope.$bstEl = $('#fismaexp2table');
      $scope.hasUsedSearchForm = false;
      $scope.rootPath = '/FISMAexp2';

      var fsystems = FISMAexp2Src.query();
      fsystems.$promise.then(function (populateData) {
        $scope.bstData = [];
        var art = "";
        var link = "";
        $.each(fsystems, function (key, val) {
 /*          var artifacts = [];

          _.each(val.RelatedArtifacts, function (artifact) {
            artifacts.push('<a class="no-propagation" target="_blank" href="' +
            artifact.ReferenceDocuments +  '">' + artifact.Name + '</a>');
          });

          art = val.RelatedArtName;
          link = val.RelatedArtURL; */
          $scope.bstData.push({
            "RelOrgDisplayName" : val.RelOrgDisplayName,
            "Name" : val.Name,
            "Id" : val.Id,
            "FedContractorLoc" : val.FedContractorLoc,
            "FIPS199" : val.FIPS199,
            "ATODate" : val.ATODate,
            "ATOType" : val.ATOType,
            "RenewalDate" : val.RenewalDate,
            "ComplFISMA" : val.ComplFISMA,
            "FISMASystemIdentifier" : val.FISMASystemIdentifier,
			"InactiveDate" : val.InactiveDate,
			"PII": val.PII,
			"CloudYN": val.CloudYN,
			"CSP": val.CSP,
			"ServiceType": val.ServiceType,
            "Artifacts": val.RelatedArtifacts //artifacts.join(',<br/>')
          });
        });
        bstSearchUtils.checkFilterState($scope);
        $scope.bsTableConfig = {
          columns: [{
            field: 'Name',
            title: 'System Name',
            sortable: true
          }, {
            field: 'RelOrgDisplayName',
            title: 'Responsible Org',
            sortable: true
          }, {
            field: 'FedContractorLoc',
            title: 'Federal/Contractor',
            sortable: true,
            visible: false
          }, {
            field: 'FIPS199',
            title: 'FIPS Impact Level',
            sortable: true,
            visible: false
          }, {
            field: 'ATODate',
            title: 'ATO Date',
            sortable: true
          }, {
            field: 'ATOType',
            title: 'ATO Type',
            sortable: true
          }, {
            field: 'RenewalDate',
            title: 'Renewal Date',
            sortable: true
          }, {
            field: 'ComplFISMA',
            title: 'Complete Assessment For Current FY',
            sortable: true,
            visible: false
          }, {
            field: 'PII',
            title: 'PII',
            sortable: true,
            visible: false
          },{
            field: 'CloudYN',
            title: 'Cloud Hosted?',
            sortable: true,
            visible: false
          },{
            field: 'CSP',
            title: 'Cloud Server Provider',
            sortable: true,
            visible: false
          },{
            field: 'ServiceType',
            title: 'Type of Service',
            sortable: true,
            visible: false
          },{
            field: 'Artifacts',
            title: 'Related Artifacts'
          },
          {
            field: 'FISMASystemIdentifier',
            title: 'FISMA System Identifier',
            sortable: true,
            visible: false
          },
		  {
			field: 'InactiveDate',
			title: 'Inactive Date',
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

    $('#fismaexp2table')
    .on('click-cell.bs.table', function (e, field, value, row, $element) {
      // note: this :has selector cannot be cached as a jQuery selection;
      // done this way to get around that caching issues & other DOM
      // availabily issues
      // ALSO: bs-table plugin captures events and prevents propagation
      // from inner children to bubble back up. The only solution so
      // far is to explicitly exclude by column name
      if ((!!$('.bootstrap-table:not(:has(.dropdown-toggle[aria-expanded="true"]))').length)
      && field !== 'Artifacts') {
        $location.path('/FISMA/' + row.Id);
        $scope.$apply();
      }
    });

    // Method for retrieving a single System's details
    $scope.createFISMADetail = function() {
      $(function () {
        $('[data-toggle="tooltip"]').tooltip()
      });
      // Use the fisma_system 'get' method to send an appropriate GET request
      var fisma = FISMASrc.query({ id: $routeParams.id });
      var fismaid = '';
      // added via merge (from here to next empty line)
      var apps = FISMAApplicationsSrc.query({ id: $routeParams.id });//$routeParams.id
      // var pocs = FISMAPOCsSrc.query({ id: $routeParams.id });
      var pocs = FISMASrc.query({ id: $routeParams.id });
	 
      fisma.$promise.then(function () {
        $scope.fisma = fisma[0];
        /* $scope.fisma.RelatedArtName = fisma[0].RelatedArtifacts[0].Name.replace('amp;', '');
        $scope.fisma.RelatedArtURL = fisma[0].RelatedArtifacts[0].ReferenceDocuments;  */
		/* $scope.fisma.RelatedArtName = fisma[0].RelatedArtifacts[0].substr(fisma[0].RelatedArtifacts[0].indexOf("\">")+2,fisma[0].RelatedArtifacts[0].indexOf("</a>")-fisma[0].RelatedArtifacts[0].indexOf("\">")-2);
		$scope.fisma.RelatedArtURL = fisma[0].RelatedArtifacts[0].substr(fisma[0].RelatedArtifacts[0].indexOf("href=\"")+6,fisma[0].RelatedArtifacts[0].indexOf("\">")-fisma[0].RelatedArtifacts[0].indexOf("href=\"")-6)
         */
		$scope.fisma.RelatedArtName_test = [];

		for(var i = 0; i < fisma[0].RelatedArtifacts.length; i++){
			var cb = {
			ArtName: fisma[0].RelatedArtifacts[i].substr(fisma[0].RelatedArtifacts[i].indexOf("\">")+2,fisma[0].RelatedArtifacts[i].indexOf("</a>")-fisma[0].RelatedArtifacts[i].indexOf("\">")-2),
			ArtURL: fisma[0].RelatedArtifacts[i].substr(fisma[0].RelatedArtifacts[i].indexOf("href=\"")+6,fisma[0].RelatedArtifacts[0].indexOf("\">")-fisma[0].RelatedArtifacts[0].indexOf("href=\"")-6),
			}
		$scope.fisma.RelatedArtName_test.push(cb);
		}
        if(fisma[0].CSP =='N/A') $scope.fisma.CSP = '';
        if(fisma[0].ServiceType =='N/A') $scope.fisma.ServiceType = '';
		var newpoc;
        pocs.$promise.then(function () {
			
			newpoc = pocs[0].POC;
          $('#fismapocstable').bootstrapTable({
            columns: [
              {
                field: 'Type',
                title: 'Role',
                sortable: true
              },
              {
                field: 'Name',
                title: 'Name',
                sortable: true
              },
              {
                field: 'Phone',
                title: 'Phone Number',
                sortable: true
              },
              {
                field: 'Email',
                title: 'Email',
                sortable: true
              },
            ],
            data: newpoc
          });
        });
      });

      apps.$promise.then(function (populateData) {
        $scope.applications = apps;
        $('#fismaappstable').bootstrapTable({
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
                field: 'SSOShort',
                title: 'SSO',
                sortable: true,
                visible: false
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

				/* 			{
				field: 'Id',
				title: 'Id',
				sortable: true,
				visible: false
			  }, */

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
				title: 'Platform',
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
          field: 'OMBUID',
          title: 'OMB Unique ID',
          sortable: true,
          visible: false
        }],
        data: apps
      });
    });
  }


  // Method to handle click events on FISMA Certified Applications table
  $('#fismaappstable').on('click-row.bs.table', function (e, row, $element) {
    // note: this :has selector cannot be cached; done this way to get
    // around caching & DOM availabily issues
    if (!!$('.bootstrap-table:not(:has(.dropdown-toggle[aria-expanded="true"]))').length) {
      $location.path('/applications/' + row.Id);
      $route.reload();
    }
  });

  // Method for Fisma Systems POC table
  $scope.createFISMAPOCTable = function () {
    $scope.$bstEl = $('#fismapoctable');
    $scope.hasUsedSearchForm = false;
    $scope.rootPath = '/FISMA_POC';

    var fismaSrc = FISMASrc.query();
    fismaSrc.$promise.then(function () {
      var pocs = FISMASrc.query();
	  var newpoc;
/*      pocs.$promise.then(function () {
		  newpoc = pocs[0].POC;
         _.each(fismaSrc, function (item) {
          _.each(_.keys(item), function (key) {
			  		console.log(item.POC);
			  		console.log(newpoc);
            var match = _.where(pocs, {Type: key, ParentId: item.ID});
					console.log(match);
            // var match = _.where(pocs, {Type: key, ParentId: item.Id});
            if (match.length) {
				console.log(item[key]);
              item[key] = match[0].Name + " " +  "<a href=mailto:" + match[0].Email + ">" + match[0].Email + "</a>"+ " " + (match[0].Phone || '');
            }
          });
        }); */

		
        $scope.bstData = fismaSrc;
		
        $scope.bstData = _.uniq(fismaSrc, function(item) {
			console.log(item.Name);
          return item.Name;
        });
        bstSearchUtils.checkFilterState($scope);
		console.log($scope.bstData[0])
        $scope.bsTableConfig = {
          columns: [{
            field: 'RelOrgDisplayName',
            title: 'Responsible SSO',
            sortable: true
          }, {
            field: 'Name',
            title: 'System Name',
            sortable: true
          }, {
            field: 'FIPS199',
            title: 'FIPS Impact Level',
            sortable: true
          }, {
            field: 'ISSM',
            title: 'ISSM',
            sortable: true
          }, {
            field: 'ISSO',
            title: 'ISSO',
            sortable: true
          }, {
            field: 'Program Manager', // an alias to fisma.PM so we can match poc.Type value
            title: 'Program Manager',
            sortable: true
          }, {
            field: 'Authorizing Official',  // an alias to fisma.AO so we can match poc.Type value
            title: 'Authorizing Official',
            sortable: true
          }],
          data: $scope.bstData
        };
        bstSearchUtils.updateConfig($scope);
        $scope.$bstEl.bootstrapTable($scope.bsTableConfig);
        bstSearchUtils.handleSearchState($scope);

  //    });
    });
  }

  $('#fismapoctable').on('click-row.bs.table', function (e, row, $element) {
    // note: this :has selector cannot be cached; done this way to get
    // around caching & DOM availabily issues
    if (!!$('.bootstrap-table:not(:has(.dropdown-toggle[aria-expanded="true"]))').length) {
      $location.path('/FISMA/' + row.Id);
      $route.reload();
    }
  });

  // Method for Fisma Systems RISSO POC table
  $scope.createRISSOPOCTable = function () {
    $scope.$bstEl = $('#rissopoctable');
    $scope.hasUsedSearchForm = false;
    $scope.rootPath = '/RISSO_POC';

    var risso = POCSrc.query();

    risso.$promise.then(function (populateData) {
      $scope.bstData = [];
      $.each(risso, function (key, val) {
        //       if ([val.SecurityRole] == 'RISSO'){
        $scope.bstData.push({"Name" : val.Name, "Organization" : val.Owner, "SecurityRole" : "RISSO", "Region" : val.Region, "PhoneNumber" : val.Phone, "Email" : "<a href=mailto:" + val.Email + ">" + val.Email + "</a>"});
        //       }
      });
      bstSearchUtils.checkFilterState($scope);
      $scope.bsTableConfig = {
        columns: [{
          field: 'Name',
          title: 'Name',
          sortable: true
        }, /* {
          field: 'Organization',
          title: 'Organization',
          sortable: true
        }, */ {
          field: 'SecurityRole',
          title: 'Security Role',
          sortable: true
        }, {
          field: 'Region',
          title: 'Region',
          sortable: true
        }, {
          field: 'PhoneNumber',
          title: 'Phone Number',
          sortable: true
        }, {
          field: 'Email',
          title: 'Email',
          sortable: true
        }],
        data: $scope.bstData
      };
      bstSearchUtils.updateConfig($scope);
      $scope.$bstEl.bootstrapTable($scope.bsTableConfig);
      bstSearchUtils.handleSearchState($scope);

    });
  }
}
]);
