angular.module('heleleCtrl', ['myApp.services'])
.controller('heleleController',['$scope','socket',

 function($scope, socket) {    
    $scope.message = 'test';

    socket.on('send:name', function (data) {
      $scope.name = data.name;
    });

    $scope.users = [{age:11, name:'Sung1', sex:true},
                {age:22, name:'Sung3', sex:false},
                {age:33, name:'Sung2', sex:true}];    


}]);

angular.module('scotchCtrl', []).controller('scotchController',
 function($scope) {
    
    var peopledb = 'js/people';

    $scope.message = 'test';
   
    $scope.scotches = 
    [
        {
            name: 'Macallan 12',
            price: 50
        },
        {
            name: 'Chivas Regal Royal Salute',
            price: 10000
        },
        {
            name: 'Glenfiddich 1937',
            price: 20000
        }
    ];
    
});



// routerApp.controller('heleleController', function($scope, socket) {
    
//     $scope.message = 'test';

//     socket.on('send:name', function (data) {
//       $scope.name = data.name;
//     });

//     $scope.users = [{age:11, name:'Sung1', sex:true},
//                 {age:22, name:'Sung3', sex:false},
//                 {age:33, name:'Sung2', sex:true}];    


// });


// routerApp.controller('scotchController', function($scope) {
    
//     var peopledb = 'js/people';

//     $scope.message = 'test';
   
//     $scope.scotches = 
//     [
//         {
//             name: 'Macallan 12',
//             price: 50
//         },
//         {
//             name: 'Chivas Regal Royal Salute',
//             price: 10000
//         },
//         {
//             name: 'Glenfiddich 1937',
//             price: 20000
//         }
//     ];
    
// });