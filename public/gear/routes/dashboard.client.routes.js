/* eslint-disable */

// Invoke 'strict' JavaScript mode
'use strict';

// Configure the 'example' module routes
angular.module('dashboard').config(['$routeProvider', '$locationProvider',
function($routeProvider, $locationProvider) {
  $routeProvider.
  when('/', {
    templateUrl: '/gear/partials/dashboard.html'
  }).
  // TODO: any reason to keep this broken reference?
  when('/overview', {
    templateUrl: 'dashboard/partials/overview.client.view.html'
  }).
  when('/siteoverview', {
    templateUrl: '/gear/partials/site_overview.html'
  }).
  when('/assistivetechnology', {
    templateUrl: '/gear/partials/assistive_technology.html'
  }).
  when('/glossary', {
    templateUrl: '/gear/partials/glossary.html'
  }).

  //Configure Business Routes
  when('/organizations/find/:query*', {
    templateUrl: '/gear/partials/business_organization_report.html'
  }).
  when('/organizations', {
    templateUrl: '/gear/partials/business_organization_report.html'
  }).
  when('/organizations/:id', {
    templateUrl: '/gear/partials/business_organization_detail.html'
  }).
  when('/organization_model', {
    templateUrl: '/gear/partials/business_organization_chart.html'
  }).
  when('/capabilities/find/:query*', {
    templateUrl: '/gear/partials/business_function_report.html'
  }).
  when('/capabilities', {
    templateUrl: '/gear/partials/business_function_report.html'
  }).
  when('/capability_model', {
    templateUrl: '/gear/partials/business_function_chart.html'
  }).
  when('/capabilities/:id', {
    templateUrl: '/gear/partials/business_function_detail.html'
  }).

  //Configure Strategy Routes
  when('/goals/find/:query*', {
    templateUrl: '/gear/partials/strategy_goal_report.html'
  }).
  when('/goals', {
    templateUrl: '/gear/partials/strategy_goal_report.html'
  }).
  when('/investments/find/:query*', {
    templateUrl: '/gear/partials/strategy_investment_report.html'
  }).
  when('/investments', {
    templateUrl: '/gear/partials/strategy_investment_report.html'
  }).
  when('/investments/:investmentType', {
    templateUrl: '/gear/partials/strategy_investment_report.html'
  }).
  when('/investments/:investmentType/find/:query*', {
    templateUrl: '/gear/partials/strategy_investment_report.html'
  }).
  when('/investment/:id', {
    templateUrl: '/gear/partials/strategy_investment_detail.html'
  }).
  when('/strategic_framework', {
    templateUrl: '/gear/partials/strategy_framework.html'
  }).
  when('/application_strategy', {
    templateUrl: '/gear/partials/strategy_application_roadmap.html'
  }).


  //Configure Application Routes
  when('/applications/find/:query*', {
    templateUrl: '/gear/partials/application_application_report.html'
  }).
  when('/applications', {
    templateUrl: '/gear/partials/application_application_report.html'
  }).
  when('/usdaapplications', {
    templateUrl: '/gear/partials/application_usdaapplication_report.html'
  }).
  when('/applications_retired/find/:query*', {
    templateUrl: '/gear/partials/application_retiredapplication_report.html'
  }).
  when('/applications_retired', {
    templateUrl: '/gear/partials/application_retiredapplication_report.html'
  }).
  when('/applications/:applicationId', {
    templateUrl: '/gear/partials/application_application_detail.html'
  }).
  when('/applications_BySSO/:ownerName/find/:query*', {
    templateUrl: '/gear/partials/application_application_report.html'
  }).
  when('/applications_BySSO/:ownerName', {
    templateUrl: '/gear/partials/application_application_report.html'
  }).
  when('/applications_TIME/find/:query*', {
    templateUrl: '/gear/partials/application_time_report.html'
  }).
  when('/applications_TIME', {
    templateUrl: '/gear/partials/application_time_report.html'
  }).
  when('/systems/find/:query*', {
    templateUrl: '/gear/partials/application_system_report.html'
  }).
  when('/systems', {
    templateUrl: '/gear/partials/application_system_report.html'
  }).
  when('/systems/:id', {
    templateUrl: '/gear/partials/application_system_detail.html'
  }).
  when('/application_interfaces', {
    templateUrl: '/gear/partials/application_interface_chart.html'
  }).
  when('/application_interfaces_BySSO/:interfaceSSO', {
    templateUrl: '/gear/partials/application_interface_sso.html'
  }).


  //Configure Datasets Routes
  when('/datasets', {
    templateUrl: '/gear/partials/data_dataset_report.html'
  }).


  //Configure Infrastructure Routes
  when('/itstandards/find/:query*', {
    templateUrl: '/gear/partials/infrastructure_itstandards_report.html'
  }).
  when('/itstandards', {
    templateUrl: '/gear/partials/infrastructure_itstandards_report.html'
  }).
  when('/itstandards_ByCategory', {
    templateUrl: '/gear/partials/infrastructure_itstandardsbycat_report.html'
  }).
  when('/itstandards/:id', {
    templateUrl: '/gear/partials/infrastructure_itstandards_detail.html'
  }).

  when('/itstandards_ByCategory/:standardCat', {
    templateUrl: '/gear/partials/infrastructure_itstandards_report.html'
  }).
  when('/itstandards_goldimage/find/:query*', {
    templateUrl: '/gear/partials/infrastructure_goldimage_report.html'
  }).
  when('/itstandards_goldimage', {
    templateUrl: '/gear/partials/infrastructure_goldimage_report.html'
  }).

  //Configure Security Routes
  when('/FISMA/find/:query*', {
    templateUrl: '/gear/partials/security_fisma_report.html'
  }).
  when('/FISMA', {
    templateUrl: '/gear/partials/security_fisma_report.html'
  }).
   when('/FISMAexp/find/:query*', {
    templateUrl: '/gear/partials/security_fismaexp_report.html'
  }).
  when('/FISMAexp', {
    templateUrl: '/gear/partials/security_fismaexp_report.html'
  }).
  when('/FISMAexp1/find/:query*', {
    templateUrl: '/gear/partials/security_fismaexp1_report.html'
  }).
  when('/FISMAexp1', {
    templateUrl: '/gear/partials/security_fismaexp1_report.html'
  }).
  when('/FISMAexp2/find/:query*', {
    templateUrl: '/gear/partials/security_fismaexp2_report.html'
  }).
  when('/FISMAexp2', {
    templateUrl: '/gear/partials/security_fismaexp2_report.html'
  }).
  when('/FISMA/:id', {
    templateUrl: '/gear/partials/security_fisma_detail.html'
  }).
  when('/FISMA_POC/find/:query*', {
    templateUrl: '/gear/partials/security_fismapoc_report.html'
  }).
  when('/FISMA_POC', {
    templateUrl: '/gear/partials/security_fismapoc_report.html'
  }).
  when('/RISSO_POC/find/:query*', {
    templateUrl: '/gear/partials/security_rissopoc_report.html'
  }).
  when('/RISSO_POC', {
    templateUrl: '/gear/partials/security_rissopoc_report.html'
  }).
  otherwise({
    redirectTo: '/'
  });

  // $locationProvider.html5Mode(true);
}
]);
