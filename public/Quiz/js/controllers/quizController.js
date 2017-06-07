
app.controller('quizController',function($scope,$localStorage,$routeParams,$http,$location,$rootScope,problem,$window,Path_Api,$uibModal,$log) {

    $scope.user = $localStorage.user;
    console.log($scope.user);
    $scope.isLoadingChoice1 = false;
    $scope.isLoadingChoice2 = false;
    $scope.isNextProblem = false;


    $scope.answer = "no";
    $scope.problem;
    $scope.answer;
    $scope.timeoutProblem;
    $scope.timerRunning = true;
    $scope.go = function (path) {
        $location.path(path);
    }
    var seconds = 0;

    $window.onpopstate = function (e) {
        delete $localStorage.user;
        console.log($localStorage.user);
    };
    //timer
    $scope.startTimer = function () {
        $scope.$broadcast('timer-start');
        $scope.timerRunning = true;
    };
    $scope.resetClock = function() {
        $scope.$broadcast('timer-reset');
    }
    $scope.stopTimer = function (){
        $scope.timerRunning = false;
        $scope.$broadcast('timer-stop');

    };

    $scope.$on('timer-stopped', function (event, data){
        seconds = data.seconds;
        if(data.seconds === 0 && $localStorage.user !== undefined){

            $scope.nextProblem();
        }

    });

    //Before Close Browser
    $scope.onExit = function(e) {
        console.log(e);
        $scope.nextProblem();
        return ('bye bye');
    };

    $window.onbeforeunload =  $scope.onExit;




    $scope.timeOut = function (size, parentSelector) {
        var parentElem = parentSelector ?
            angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            backdrop:'static',
            templateUrl: '../Quiz/js/views/model/timeout.html',
            controller: function($scope,$uibModalInstance){


                $scope.logout = function () {
                    $uibModalInstance.close("logout");

                };

                $scope.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };

            },
            size: size,
            appendTo: parentElem,

        })
        modalInstance.result.then(function (massage) {
            if(massage === "logout"){
                $scope.logout();
            }
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });

    }

    $scope.logout = function () {
        delete $localStorage.user;
        $location.path('/login');
    }

    getProblem($localStorage.user.question_id);
    /*if($localStorage.user !== undefined){
        getProblem($localStorage.user.question_id);
    }else{
        console.log("hello");
        $scope.stopTimer();
        $scope.timeOut('lg',undefined);
    }*/

    function getProblem(id) {

        problem.getData(id).then(
            function(response){
                var data = response.data;
                console.log(data);
                $scope.problem = data;

            },
            function(response){
                // failure call back
            });

    }
    

    $scope.selectChoice = function (choice,type_choice) {


        if(choice === 1){

            $scope.isLoadingChoice1 = true;
            $scope.isLoadingChoice2 = false;
        }
        else if(choice === 2) {
            $scope.isLoadingChoice2 = true;
            $scope.isLoadingChoice1 = false;
        }else if(choice === "Reset"){
            $scope.isLoadingChoice1 = false;
            $scope.isLoadingChoice2 = false;
        }

        if(type_choice !== null){
            $scope.answer = type_choice;
        }else{
            $scope.answer = "no";
        }

    };
    
    $scope.nextProblem = function() {
        $scope.isNextProblem = true;
        if(seconds !== 0){
            $scope.stopTimer();
        }


        var dataSelectChoice = {
            user_id: $localStorage.user.user_id,
            problem_id : $scope.problem.question_id,
            answer : $scope.answer,
            set : $scope.problem.set,

         }
         console.log(dataSelectChoice);
        $http.post(Path_Api.api_post_question, dataSelectChoice)
            .then(
                function(response){

                    // success
                    var data = response.data;
                    console.log(data);
                    if(data.question_id === "22"){
                        checkAnswerQuestion();
                    }else{
                        $scope.isNextProblem = false;
                        $scope.selectChoice("Reset",null);
                        changeProbelm(data.question_id);
                        $scope.resetClock();
                        $scope.startTimer();

                    }

                },
                function(response){
                    // failure callback

                }
            );


    };
    
    function checkAnswerQuestion() {
        var path = Path_Api.api_get_check_all_question + $localStorage.user.user_id;
        $http.get(path)
            .then(
                function(response){
                    var data = response.data;

                    $scope.timeoutProblem = data;

                    console.log($scope.timeoutProblem);
                    if($scope.timeoutProblem.length === 0){
                        $location.path('/showtypeperson/'+$localStorage.user.user_id);
                    }else{
                        $scope.isNextProblem = false;
                        $scope.selectChoice("Reset",null);
                        changeProbelm($scope.timeoutProblem[0].question_id);
                        $scope.resetClock();
                        $scope.startTimer();

                    }
                },
                function(response){
                    // failure callback
                }
            );
    }
    
    function changeProbelm(id) {
        getProblem(id);
    };







});

