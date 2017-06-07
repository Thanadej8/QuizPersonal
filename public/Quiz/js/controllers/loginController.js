
app.controller('loginController',function($scope,$localStorage,$routeParams,$http,$location,$rootScope,Path_Api) {

    $scope.massage;

    $scope.login = function () {
        var dataLogin = {
            username: $scope.username,
        }
        console.log(dataLogin);
        $http.post(Path_Api.api_login, dataLogin)

            .then(
                function(response){
                    // success
                    var data = response.data;
                    console.log(data);
                    if(data.msg === "username is incorrect"){
                        $scope.massage = "กรอกข้อมูลผิดพลาด ไม่สามารถเข้าสู่ระบบได้";
                    }else{
                        $localStorage.user = data;

                        if(data.role === "user"){
                            if(data.question_id === null){
                                $localStorage.user.question_id = 1;
                                $location.path('/quiz')
                            }else if(data.question_id === "22"){
                                $location.path('/showtypeperson/'+$localStorage.user.user_id);
                            }else{
                                $location.path('/quiz');
                            }
                        }else if(data.role === "admin"){
                            $location.path('/admin');
                        }
                    }

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

