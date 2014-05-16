
routerApp.controller('scotchController', function($scope) {
    
    var peopledb = 'js/people';

    $scope.message = 'test';
   
    $scope.scotches = 
    // function(req, res) {
    //     peopledb.getPerson(5, function(err, persons){
    //         res.json(persons);
    //     });

    // };
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