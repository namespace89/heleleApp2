angular.module('AngularApp', []).config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/home');
    
    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            templateUrl: 'socketio6/view/partial-home.html'
        })
        
        // nested list with custom controller
        .state('home.list', {
            url: '/list',
            templateUrl: 'socketio6/view/partial-home-list.html',
            controller: 'heleleController'
            // controller: function($scope) {
            //     $scope.users = [{age:11, name:'Sung1', sex:true},
            //     {age:22, name:'Sung3', sex:false},
            //     {age:33, name:'Sung2', sex:true}];
            // }
        })
        
        // nested list with just some random string data
        .state('home.paragraph', {
            url: '/paragraph',
            template: 'I could sure use a drink right now.'
        })
        
        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('about', {
            url: '/about',
            views: {
                '': { templateUrl: 'socketio6/view/partial-about.html' },
                'columnOne@about': { template: 'Look I am a column!' },
                'columnTwo@about': { 
                    templateUrl: 'socketio6/view/table-data.html',
                    controller: 'scotchController'
                }
            }
            
        });
        
}]);




// var routerApp = angular.module('routerApp', ['ui.router',]);

// routerApp.config(function($stateProvider, $urlRouterProvider) {
    
//     $urlRouterProvider.otherwise('/home');
    
//     $stateProvider
        
//         // HOME STATES AND NESTED VIEWS ========================================
//         .state('home', {
//             url: '/home',
//             templateUrl: 'socketio6/view/partial-home.html'
//         })
        
//         // nested list with custom controller
//         .state('home.list', {
//             url: '/list',
//             templateUrl: 'socketio6/view/partial-home-list.html',
//             controller: 'heleleController'
//             // controller: function($scope) {
//             //     $scope.users = [{age:11, name:'Sung1', sex:true},
//             //     {age:22, name:'Sung3', sex:false},
//             //     {age:33, name:'Sung2', sex:true}];
//             // }
//         })
        
//         // nested list with just some random string data
//         .state('home.paragraph', {
//             url: '/paragraph',
//             template: 'I could sure use a drink right now.'
//         })
        
//         // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
//         .state('about', {
//             url: '/about',
//             views: {
//                 '': { templateUrl: 'socketio6/view/partial-about.html' },
//                 'columnOne@about': { template: 'Look I am a column!' },
//                 'columnTwo@about': { 
//                     templateUrl: 'socketio6/view/table-data.html',
//                     controller: 'scotchController'
//                 }
//             }
            
//         });
        
// });

