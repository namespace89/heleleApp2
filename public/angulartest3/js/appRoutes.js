angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/angulartest3/', {
			templateUrl: 'angulartest3/views/home.html',
			controller: 'MainController'
		})

		.when('/angulartest3/nerds', {
			templateUrl: 'angulartest3/views/nerd.html',
			controller: 'NerdController'
		})

		.when('/angulartest3/geeks', {
			templateUrl: 'angulartest3/views/geek.html',
			controller: 'GeekController'	

		})

		.when('/angulartest3/sung1', {
			templateUrl: 'angulartest3/views/sung1.html',
			controller: 'Sung1Controller'	

		})

		.when('/angulartest3/sung2', {
			templateUrl: 'angulartest3/views/sung2.html',
			controller: 'Sung2Controller'	

		})

		.when('/angulartest3/sung3', {
			templateUrl: 'angulartest3/views/sung3.html',
			controller: 'Sung3Controller'	

		})

		.when('/angulartest3/sung4', {
			templateUrl: 'angulartest3/views/sung4.html',
			controller: 'Sung4Controller'	
		});

	$locationProvider.html5Mode(true);

}]);