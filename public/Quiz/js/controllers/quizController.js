
app.controller('quizController',function($scope,$localStorage,$routeParams,$http,$location,$rootScope,problem,$window) {
    $localStorage.user;
    $scope.isLoadingChoice1 = false;
    $scope.isLoadingChoice2 = false;
    $scope.isNextProblem = false;
    $scope.endTime = 30000;
    $window.onpopstate = function (e) { window.history.forward(1); };
    $scope.problem;
    $scope.problems = [
        {
            problem_name : "คุณจะเลือกอะไรระหว่าง.....",
            choice_1 : "ไม่เลือก",
            choice_2 : "เลือกอะไร"
        },
        {
            problem_name : "คุณจะเลือกอะไรระหว่าง.....2",
            choice_1 : "ไม่เลือก",
            choice_2 : "เลือกอะไร"
        }
        ,
        {
            problem_name : "คุณจะเลือกอะไรระหว่าง.....3",
            choice_1 : "ไม่เลือก",
            choice_2 : "เลือกอะไร"
        },
        {
            problem_name : "คุณจะเลือกอะไรระหว่าง.....4",
            choice_1 : "ไม่เลือก",
            choice_2 : "เลือกอะไร"
        }

    ];
    //getProblem($localStorage.user.id);
    function getProblem(id) {

        problem.getData(id).then(
            function(response){
                var data = response.data;
                console.log(data);

            },
            function(response){
                // failure call back
            });

    }
    

    $scope.selectChoice = function (choice) {


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

    };
    
    $scope.nextProblem = function() {
        $scope.isNextProblem = true;

        /*var dataSelectChoice = {
         id: $localStorage.user.id,
         problem_id : $scope.problem.id,
         choice : choice,
         }
        $http.post('/', dataSelectChoice)
            .then(
                function(response){

                    // success
                    var data = response.data;
                    console.log(data);
                    if(data.massage === "last problem"){
                        $location.path('/showtypeperson/'+$localStorage.user.id);
                    }else{
                        $scope.isNextProblem = false;
                        $scope.selectChoice("Reset");
                        changeProbelm($scope.problem.id);

                    }

                },
                function(response){
                    // failure callback
                }
            );
         */

    };
    
    function changeProbelm(id) {
        $scope.problem = $scope.problems[id+1];
    };

    //Before Close Browser
    $scope.onExit = function() {
        $scope.nextProblem();
        return ('bye bye');
    };

    $window.onbeforeunload =  $scope.onExit;

    //timer
    $scope.startProblem = function () {
        $scope.$broadcast('timer-add-cd-seconds', 30);
    }

    $scope.$on('timer-stopped', function (event, data){
        $scope.nextProblem();
        console.log('Timer Stopped - data = ', data);
    });



});

