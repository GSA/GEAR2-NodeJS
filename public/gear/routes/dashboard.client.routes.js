/* eslint-disable */

// Invoke 'strict' JavaScript mode
'use strict';

// Configure the 'example' module routes
angular.module('dashboard').config(['$routeProvider', '$locationProvider',
function($routeProvider, $locationProvider) {
	$routeProvider.
	when('/', {
		templateUrl: 'partials/dashboard.html'
	}).
	when('/overview', {
		templateUrl: 'dashboard/partials/overview.client.view.html'
	}).
	when('/siteoverview', {
		templateUrl: 'partials/site_overview.html'
	}).
	when('/assistivetechnology', {
		templateUrl: 'partials/assistive_technology.html'
	}).
  when('/glossary', {
		templateUrl: 'partials/glossary.html'
	}).

	//Configure Business Routes
	when('/organizations/find/:query*', {
		templateUrl: 'partials/business_organization_report.html'
	}).
	when('/organizations', {
		templateUrl: 'partials/business_organization_report.html'
	}).
	when('/organizations/:id', {
		templateUrl: 'partials/business_organization_detail.html'
	}).
	when('/organization_model', {
		templateUrl: 'partials/business_organization_chart.html'
	}).
	when('/capabilities/find/:query*', {
		templateUrl: 'partials/business_function_report.html'
	}).
	when('/capabilities', {
		templateUrl: 'partials/business_function_report.html'
	}).
	when('/capability_model', {
		templateUrl: 'partials/business_function_chart.html'
	}).
	when('/capabilities/:id', {
		templateUrl: 'partials/business_function_detail.html'
	}).

	//Configure Strategy Routes
	when('/goals/find/:query*', {
		templateUrl: 'partials/strategy_goal_report.html'
	}).
	when('/goals', {
		templateUrl: 'partials/strategy_goal_report.html'
	}).
	when('/investments/find/:query*', {
		templateUrl: 'partials/strategy_investment_report.html'
	}).
	when('/investments', {
		templateUrl: 'partials/strategy_investment_report.html'
	}).
	when('/investments/:investmentType', {
		templateUrl: 'partials/strategy_investment_report.html'
	}).
	when('/investments/:investmentType/find/:query*', {
		templateUrl: 'partials/strategy_investment_report.html'
	}).
	when('/investment/:id', {
		templateUrl: 'partials/strategy_investment_detail.html'
	}).
	when('/strategic_framework', {
		templateUrl: 'partials/strategy_framework.html'
	}).
	when('/application_strategy', {
		templateUrl: 'partials/strategy_application_roadmap.html'
	}).


	//Configure Application Routes
	when('/applications/find/:query*', {
		templateUrl: 'partials/application_application_report.html'
	}).
	when('/applications', {
		templateUrl: 'partials/application_application_report.html'
	}).
	when('/usdaapplications', {
		templateUrl: 'partials/application_usdaapplication_report.html'
	}).
	when('/applications_retired/find/:query*', {
		templateUrl: 'partials/application_retiredapplication_report.html'
	}).
	when('/applications_retired', {
		templateUrl: 'partials/application_retiredapplication_report.html'
	}).
	when('/applications/:applicationId', {
		templateUrl: 'partials/application_application_detail.html'
	}).
	when('/applications_BySSO/:ownerName/find/:query*', {
		templateUrl: 'partials/application_application_report.html'
	}).
	when('/applications_BySSO/:ownerName', {
		templateUrl: 'partials/application_application_report.html'
	}).
	when('/applications_TIME/find/:query*', {
		templateUrl: 'partials/application_time_report.html'
	}).
	when('/applications_TIME', {
		templateUrl: 'partials/application_time_report.html'
	}).
	when('/systems/find/:query*', {
		templateUrl: 'partials/application_system_report.html'
	}).
	when('/systems', {
		templateUrl: 'partials/application_system_report.html'
	}).
	when('/systems/:id', {
		templateUrl: 'partials/application_system_detail.html'
	}).
	when('/application_interfaces', {
		templateUrl: 'partials/application_interface_chart.html'
	}).
	when('/application_interfaces_BySSO/:interfaceSSO', {
		templateUrl: 'partials/application_interface_sso.html'
	}).


	//Configure Datasets Routes
	when('/datasets', {
		templateUrl: 'partials/data_dataset_report.html'
	}).


	//Configure Infrastructure Routes
	when('/itstandards/find/:query*', {
		templateUrl: 'partials/infrastructure_itstandards_report.html'
	}).
	when('/itstandards', {
		templateUrl: 'partials/infrastructure_itstandards_report.html'
	}).
	when('/itstandards_ByCategory', {
		templateUrl: 'partials/infrastructure_itstandardsbycat_report.html'
	}).
	when('/itstandards/:id', {
		templateUrl: 'partials/infrastructure_itstandards_detail.html'
	}).

	when('/itstandards_ByCategory/:standardCat', {
		templateUrl: 'partials/infrastructure_itstandards_report.html'
	}).
	when('/itstandards_goldimage/find/:query*', {
		templateUrl: 'partials/infrastructure_goldimage_report.html'
	}).
	when('/itstandards_goldimage', {
		templateUrl: 'partials/infrastructure_goldimage_report.html'
	}).

	//Configure Security Routes
	when('/FISMA/find/:query*', {
		templateUrl: 'partials/security_fisma_report.html'
	}).
	when('/FISMA', {
		templateUrl: 'partials/security_fisma_report.html'
	}).
	when('/FISMAexp/find/:query*', {
		templateUrl: 'partials/security_fismaexp_report.html'
	}).
	when('/FISMAexp', {
		templateUrl: 'partials/security_fismaexp_report.html'
	}).
	when('/FISMAexp1/find/:query*', {
		templateUrl: 'partials/security_fismaexp1_report.html'
	}).
	when('/FISMAexp1', {
		templateUrl: 'partials/security_fismaexp1_report.html'
	}).
	when('/FISMAexp2/find/:query*', {
		templateUrl: 'partials/security_fismaexp2_report.html'
	}).
	when('/FISMAexp2', {
		templateUrl: 'partials/security_fismaexp2_report.html'
	}).
	when('/FISMA/:id', {
		templateUrl: 'partials/security_fisma_detail.html'
	}).
	when('/FISMA_POC/find/:query*', {
		templateUrl: 'partials/security_fismapoc_report.html'
	}).
	when('/FISMA_POC', {
		templateUrl: 'partials/security_fismapoc_report.html'
	}).
	when('/RISSO_POC/find/:query*', {
		templateUrl: 'partials/security_rissopoc_report.html'
	}).
	when('/RISSO_POC', {
		templateUrl: 'partials/security_rissopoc_report.html'
	}).
	otherwise({
		redirectTo: '/'
	});

	// $locationProvider.html5Mode(true);
}
]);
