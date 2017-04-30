
app.controller('loginController',function($scope,$localStorage,$routeParams,$http,$location,$rootScope) {
    $localStorage.user;


    $scope.login = function () {
        var dataLogin = {
            username: $scope.username,
            password: $scope.password,
        }

        $http.post('/login', dataLogin)
            .then(
                function(response){
                    // success
                    var data = response.data;
                    console.log(data);

                },
                function(response){
                    // failure callback
                }
            );

    };

    $scope.go = function (path) {
        $location.path(path);
    }


});

