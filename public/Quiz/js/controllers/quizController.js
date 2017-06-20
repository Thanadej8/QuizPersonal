
app.controller('quizController',function($scope,$localStorage,$routeParams,$http,$location,$rootScope,problem,$window,Path_Api,$uibModal,$log,getOneUser,$sessionStorage,$sce) {
    $scope.user = $sessionStorage.user;
    $sessionStorage.question_id_random;
    console.log($sessionStorage.user);
    $scope.isLoadingChoice1 = false;
    $scope.isLoadingChoice2 = false;
    $scope.isNextProblem = false;

    $scope.seconds = 0;
    $scope.answer = "no";
    $scope.problem;
    $scope.answer;
    $scope.timeoutProblem;
    $scope.timerRunning = true;

    $scope.go = function (path) {
        $location.path(path);
    }
    $scope.isReload = false;


    $window.onpopstate = function () {
        getUeser($sessionStorage.user.user_id);
    };
    if (window.performance) {
        console.log("window.performance work's fine on this browser");
    }
    if (performance.navigation.type == 1) {
        console.log( "This page is reloaded" );
        $scope.isReload = true;
        getUeser($sessionStorage.user.user_id);

    } else {
        console.log( "This page is not reloaded");
    }

    function getUeser(id) {

        getOneUser.getData(id).then(
            function(response){
                var data = response.data;
                console.log(data);
                $sessionStorage.user = data[0];
                if($scope.isReload){
                    if($sessionStorage.user.question_id!== null){
                        if($sessionStorage.user.question_id !== "22" ){
                            console.log($sessionStorage.user);
                            $scope.isReload = false;
                            getProblem($sessionStorage.user.question_id);
                        }
                    }else{
                        $sessionStorage.user.question_id = "1";
                        getProblem($sessionStorage.user.question_id);
                    }




                }

            },
            function(response){
                // failure call back
            });

    }


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
        console.log("stop time");
        $scope.$broadcast('timer-stop');

    };

    $scope.$on('timer-stopped', function (event, data){
        $scope.seconds = data.seconds;
        console.log($scope.seconds);
        if(data.seconds === 0 && $sessionStorage.user !== undefined){
            $scope.nextProblem();
        }

    });

    //Before Close Browser
    $scope.onExit = function(e) {

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
        delete $sessionStorage.user;
        $location.path('/login');
    }




    function getProblem(id) {

        problem.getData(id).then(
            function(response){
                var data = response.data;
                console.log(data);

                $scope.problem = data;

                console.log($scope.problem);

            },
            function(response){
                // failure call back
            });

    }


    $scope.$watch(function () { return $scope.problem; }, function (newData, oldData) {



        $scope.problem = newData;
        $scope.$applyAsync();
    });

    function click2() {
        setTimeout(function() {
        var a2 = $('#choice2')[0];
        a2.setAttribute("style", "background-color: white; color: black; border: 1px solid black;");
        var evObj = document.createEvent('MouseEvents');
        evObj.initMouseEvent('click', true, true, window);
        a2.dispatchEvent(evObj);
        a2.removeAttribute("style");
        $scope.selectChoice("Reset",null);
    }, 10);
    }

    function eventFire(el, etype){
        if (el.fireEvent) {
            el.fireEvent('on' + etype);
        } else {
            var evObj = document.createEvent('Events');
            evObj.initEvent(etype, true, false);
            el.dispatchEvent(evObj);
        }
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
        }else if (choice === "update"){
            $scope.isLoadingChoice2 = true;
            $scope.isLoadingChoice1 = true;
        }

        if(type_choice !== null){
            $scope.answer = type_choice;
        }else{
            $scope.answer = "no";
        }

    };
    
    $scope.nextProblem = function() {
        $scope.isNextProblem = true;
        console.log($scope.timerRunning);
        if($scope.timerRunning){
            console.log($scope.timerRunning);
            $scope.stopTimer();
        }



        var dataSelectChoice = {
            user_id: $sessionStorage.user.user_id,
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
                    $sessionStorage.user = data;
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
        var path = Path_Api.api_get_check_all_question + $sessionStorage.user.user_id;
        $http.get(path)
            .then(
                function(response){
                    var data = response.data;

                    $scope.timeoutProblem = data;
                    console.log(data);
                    console.log($scope.timeoutProblem);
                    if($scope.timeoutProblem.length === 0){
                        $location.path('/showtypeperson');
                    }else{
                        var max = $scope.timeoutProblem.length;
                        for(;;){
                            var random = parseInt(Math.random() * (max - 0) + 0);
                            console.log(random);
                            if($sessionStorage.question_id_random !== random){
                                $sessionStorage.question_id_random = random;
                                break;
                            }else if($scope.timeoutProblem.length === 1){
                                break;
                            }
                        }

                        $scope.isNextProblem = false;
                        $scope.selectChoice("Reset",null);
                        changeProbelm($scope.timeoutProblem[random].question_id);
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

    if($sessionStorage.user !== undefined){
        if($sessionStorage.user.question_id === "22"){
            if($sessionStorage.user.person_type1 === null && $sessionStorage.user.person_type2 === null &&$sessionStorage.user.person_type3 === null){
                checkAnswerQuestion()
            }else{
                $location.path('/showtypeperson');
            }
        }else{
            if(!$scope.isReload){
                console.log($sessionStorage.user.question_id);
                getProblem($sessionStorage.user.question_id);
            }

        }


    }else{
        $scope.timeOut('sm',undefined)
    }





});

