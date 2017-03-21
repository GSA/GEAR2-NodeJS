/* eslint-disable */

// Invoke 'strict' JavaScript mode
'use strict';

// Create the 'Security' controller
angular.module('dashboard').controller('SecurityController', ['$route','$scope', '$http', '$routeParams', '$filter', '$location', '$sce', 'FISMASrc', 'FISMAPOC', 'RISSO', 'bstSearchUtils',
function ($route, $scope, $http, $routeParams, $filter, $location, $sce, FISMASrc, FISMAPOC, RISSO, bstSearchUtils) {
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

    var fsystems = FISMASrc.query({requestType:'ALL'});
    fsystems.$promise.then(function (populateData) {
      $scope.bstData = [];
      var art = "";
      var link = "";
      $.each(fsystems, function (key, val) {
        var artifacts = [];

        _.each(val.Artifacts, function (artifact) {
          artifacts.push('<a class="no-propagation" target="_blank" href="' +
          artifact.ReferenceDocuments +  '">' + artifact.Name + '</a>');
        });

        art = val.RelatedArtName;
        link = val.RelatedArtURL;
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
          Artifacts: artifacts.join(',<br/>')
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
          field: 'Artifacts',
          title: 'Related Artifacts'
        }, {
          field: 'Id',
          title: 'Id',
          sortable: false,
          visible: false
        }, {
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


  // Method for retrieving a single System's details
  $scope.createFISMADetail = function() {
    $(function () {
      $('[data-toggle="tooltip"]').tooltip()
    });
    // Use the fisma_system 'get' method to send an appropriate GET request
    var fisma = FISMASrc.query({requestType:"ALL", id:$routeParams.fismapath});
    var fismaid = '';
    fisma.$promise.then(function (populateData) {
      $.each(fisma, function (key, val) {
        $scope.fisId = val.Id;
        fismaid = val.Id;
        $scope.fisName = val.Name;
        $scope.atodate = val.ATODate;
        $scope.atotype = val.ATOType;
        $scope.respsso = val.RespSSO;
        $scope.relOrgDisplayName = val.RelOrgDisplayName;
        $scope.fismaSystemIdentifier = val.FISMASystemIdentifier;
        $scope.renewaldate = val.RenewalDate;
        $scope.relapps = val.RelApps;
        var poctable = $("#poctable");

        var issm = val.ISSM;
        $.each(issm, function (key, val) {
          var row = poctable[0].insertRow();
          // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
          var issmdec = row.insertCell(0);
          var issmname = row.insertCell(1);
          var issmphone = row.insertCell(2);
          var issmemail = row.insertCell(3);
          issmdec.innerHTML = '<i class="fa fa-user"></i>&nbsp;ISSM';
          issmname.innerHTML = val.Name;
          issmphone.innerHTML = val.PhoneNumber;
          issmemail.innerHTML = val.Email;
        });

        var isso = val.ISSO;
        $.each(isso, function (key, val) {
          var row = poctable[0].insertRow();
          // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
          var issodec = row.insertCell(0);
          var issoname = row.insertCell(1);
          var issophone = row.insertCell(2);
          var issoemail = row.insertCell(3);
          issodec.innerHTML = '<i class="fa fa-user"></i>&nbsp;ISSO';
          issoname.innerHTML = val.Name;
          issophone.innerHTML = val.PhoneNumber;
          issoemail.innerHTML = val.Email;
        });


        var authoff = val.AuthorizingOfficial;
        $.each(authoff, function (key, val) {
          var row = poctable[0].insertRow();
          // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
          var aodec = row.insertCell(0);
          var aoname = row.insertCell(1);
          var aophone = row.insertCell(2);
          var aoemail = row.insertCell(3);
          aodec.innerHTML = '<i class="fa fa-user"></i>&nbsp;Authorizing Official';
          aoname.innerHTML = val.Name;
          aophone.innerHTML = val.PhoneNumber;
          aoemail.innerHTML = val.Email;
        });

        var pm = val.ProgramManager;
        $.each(pm, function (key, val) {
          var row = poctable[0].insertRow();
          // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
          var pmdec = row.insertCell(0);
          var pmname = row.insertCell(1);
          var pmphone = row.insertCell(2);
          var pmemail = row.insertCell(3);
          pmdec.innerHTML = '<i class="fa fa-user"></i>&nbsp;Program Manager';
          pmname.innerHTML = val.Name;
          pmphone.innerHTML = val.PhoneNumber;
          pmemail.innerHTML = val.Email;
        });

      });
      $('#fismaappstable').bootstrapTable({
        columns: [{
          field: 'Name',
          title: 'Application Name',
          sortable: true
        }, {
          field: 'Description',
          title: 'Description',
          sortable: true
        }, {
          field: 'Id',
          title: 'Id',
          sortable: true,
          visible: false
        }],
        data: $scope.relapps
      });
    });
  }


  // Method to handle click events on FISMA Certified Applications table
  $('#fismaappstable').on('click-row.bs.table', function (e, row, $element) {
    // note: this :has selector cannot be cached; done this way to get
    // around caching & DOM availabily issues
    if (!!$('.bootstrap-table:not(:has(.dropdown-toggle[aria-expanded="true"]))').length) {
      var apppath = row.Id
      apppath = apppath.replace(/\//g , "-%")
      $location.path('/applications/' + apppath);
      $route.reload();
    }
  });

  // Method for Fisma Systems POC table
  $scope.createFISMAPOCTable = function () {
    $scope.$bstEl = $('#fismapoctable');
    $scope.hasUsedSearchForm = false;
    $scope.rootPath = '/FISMA_POC';

    var fpoc = FISMASrc.query({requestType:'POC'});
    fpoc.$promise.then(function (fisma) {
      var fisma = [];
      var issm = '';
      var isso = '';
      var pm = '';
      var ao = '';
      $.each(fpoc, function (key, val) {
        issm = val.ISSMName + " " +  "<a href=mailto:" + val.ISSMEmail + ">" + val.ISSMEmail + "</a>"+ " " + val.ISSMPhone;
        isso = val.ISSOName + " " +  "<a href=mailto:" + val.ISSOEmail + ">" + val.ISSOEmail + "</a>"+ " " + val.ISSOPhone;
        pm = val.PMName + " " +  "<a href=mailto:" + val.PMEmail + ">" + val.PMEmail + "</a>"+ " " + val.PMPhone;
        ao = val.AOName + " " +  "<a href=mailto:" + val.AOEmail + ">" + val.AOEmail + "</a>"+ " " + val.AOPhone;
        fisma.push({"RespSSO" : val.RespSSO, "Id" : val.Id, "Name" : val.Name, "FIPS199" : val.FIPS199, "ISSMName" : issm, "ISSOName" : isso, "PMName" : pm, "AOName" : ao});
      });
      $scope.bstData = [];
      $scope.bstData = _.uniq(fisma, function(item, key, Name) {
        return item.Name;
      });
      bstSearchUtils.checkFilterState($scope);
      $scope.bsTableConfig = {
        columns: [{
          field: 'RespSSO',
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
          field: 'ISSMName',
          title: 'ISSM',
          sortable: true
        }, {
          field: 'ISSOName',
          title: 'ISSO',
          sortable: true
        }, {
          field: 'PMName',
          title: 'Program Manager',
          sortable: true
        }, {
          field: 'AOName',
          title: 'Authorizing Official',
          sortable: true
        }, {
          field: 'Id',
          title: 'Id',
          sortable: false,
          visible: false
        }],
        data: $scope.bstData
      };
      bstSearchUtils.updateConfig($scope);
      $scope.$bstEl.bootstrapTable($scope.bsTableConfig);
      bstSearchUtils.handleSearchState($scope);
    });
  }

  $('#fismapoctable').on('click-row.bs.table', function (e, row, $element) {
    // note: this :has selector cannot be cached; done this way to get
    // around caching & DOM availabily issues
    if (!!$('.bootstrap-table:not(:has(.dropdown-toggle[aria-expanded="true"]))').length) {
      var fismapath = row.Id;
      fismapath = fismapath.replace(/\//g , "-%")
      $location.path('/FISMA/' + fismapath);
      $route.reload();
    }
  });

  // Method for Fisma Systems RISSO POC table
  $scope.createRISSOPOCTable = function () {
    $scope.$bstEl = $('#rissopoctable');
    $scope.hasUsedSearchForm = false;
    $scope.rootPath = '/RISSO_POC';

    var risso = RISSO.query();

    risso.$promise.then(function (populateData) {
      $scope.bstData = [];
      $.each(risso, function (key, val) {
        if ([val.SecurityRole] == 'RISSO'){
          $scope.bstData.push({"Name" : val.Name, "Organization" : val.Organization, "SecurityRole" : val.SecurityRole, "Region" : val.Region, "PhoneNumber" : val.PhoneNumber, "Email" : "<a href=mailto:" + val.Email + ">" + val.Email + "</a>"});
        }
      });
      bstSearchUtils.checkFilterState($scope);
      $scope.bsTableConfig = {
        columns: [{
          field: 'Name',
          title: 'Name',
          sortable: true
        }, {
          field: 'Organization',
          title: 'Organization',
          sortable: true
        }, {
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
