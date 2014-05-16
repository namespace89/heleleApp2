// Declare app level module which depends on filters, and services
// var app = angular.module('myApp', ['myApp.filters', 'myApp.directives']);

angular.module('myApp', [
  'ngRoute',

  'myApp.controllers',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',

  // 3rd party dependencies
  // 'btford.socket-io'
]).
config(function ($routeProvider, $locationProvider) {
  $routeProvider.
    when('/test5/view1', {
      templateUrl: 'partials2/partial1.jade',
      controller: 'MyCtrl1'
    }).
    when('/test5/view2', {
      templateUrl: 'partials2/partial2.jade',
      controller: 'MyCtrl2'
    }).
    when('/test5/view3', {
      templateUrl: 'partials2/partial3.jade',
      controller: 'MyCtrl3'
    }).
    otherwise({
      redirectTo: '/test5'
    });

  $locationProvider.html5Mode(true);
});
