'use strict';

// Declare app level module which depends on filters, and services

angular.module('myApp', [
  'myApp.controllers',
  'myApp.filters',
  'myApp.services',
  'myApp.directives'
]).
config(function ($routeProvider, $locationProvider) {
  $routeProvider.
    when('/users4/view1', {
      templateUrl: 'socketio6/views/partial1.jade',
      controller: 'MyCtrl1'
    }).
    when('/users4/view2', {
      templateUrl: 'socketio6/views/partial2.jade',
      controller: 'MyCtrl2'
    }).
    otherwise({
      // redirectTo: '/users4'
    });

  $locationProvider.html5Mode(true);
});
