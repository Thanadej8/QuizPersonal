
app.controller('adminController',function($scope,$localStorage,$routeParams,$http,$location,$rootScope) {
    $localStorage.user;



    $scope.go = function (path) {
        $location.path(path);
    }


});

