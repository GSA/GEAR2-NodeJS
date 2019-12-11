// Invoke 'strict' JavaScript mode
'use strict';

// Set the main application name
var mainApplicationModuleName = 'GSAEA';

// Create the main application
var mainApplicationModule = angular.module(mainApplicationModuleName, ['ngResource', 'ngRoute', 'dashboard']);

// Configure the hashbang URLs using the $locationProvider services 
mainApplicationModule.config(['$locationProvider',
	function($locationProvider) {
		$locationProvider.hashPrefix('!');
	}
]);

mainApplicationModule.run(function ($rootScope, $location) {
	(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
    $rootScope.$on('$routeChangeSuccess', function(){
		ga('create', 'UA-68211999-1', 'auto');
        ga('send', 'pageview', $location.path());
    });
});   



// Fix Facebook's OAuth bug
if (window.location.hash === '#_=_') window.location.hash = '#!';

// Manually bootstrap the AngularJS application
angular.element(document).ready(function() {
	angular.bootstrap(document, [mainApplicationModuleName]);
});