
app.controller('loginController',function($scope,$localStorage,$routeParams,$http,$location,$rootScope,Path_Api,$sessionStorage) {
    $sessionStorage.user;
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
                        $scope.massage = "ขออภัยค่ะ ข้อมูลไม่ถูกต้อง ไม่สามารถเข้าสู่ระบบได้";
                    }else{
                        $sessionStorage.user = data;


                        if(data.role === null){
                            if(data.question_id === null){
                                $sessionStorage.user.question_id = "1";

                                $location.path('/quiz');
                            }else if(data.question_id === "22"){
                                if(data.person_type1 === null && data.person_type2 === null && data.person_type3 === null){
                                    checkAnswerQuestion()
                                }else{
                                    $location.path('/showtypeperson');
                                }

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
    function checkAnswerQuestion() {
        var path = Path_Api.api_get_check_all_question + $sessionStorage.user.user_id;
        $http.get(path)
            .then(
                function(response){
                    var data = response.data;

                    $scope.timeoutProblem = data;

                    console.log($scope.timeoutProblem);
                    if($scope.timeoutProblem.length === 0){
                        $location.path('/showtypeperson');
                    }else{
                        $location.path('/quiz');

                    }
                },
                function(response){
                    // failure callback
                }
            );
    }


});

