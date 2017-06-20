
app.controller('adminController',function($scope,$localStorage,$routeParams,$http,$location,$rootScope,$uibModal,$log,allUser,Path_Api,getOneUser,$sessionStorage,getUserAdmin,PersonDoQuiz) {

    $scope.user = $sessionStorage.user;

    $scope.go = function (path) {
        $location.path(path);
    }



    function getUserPage(page) {
        getUserAdmin.getData(page).then(
            function(response){
                var data = response.data;
                console.log(data);
                $scope.allUser = data;

            },
            function(response){
                // failure call back
            });
    }
    function getPersonDoQuiz() {
        PersonDoQuiz.getData().then(
            function(response){
                var data = response.data;
                console.log(data);
                $scope.totelPerson = data;



            },
            function(response){
                // failure call back
            });
    }

    $scope.getAllUser = function() {

        allUser.getData().then(
            function(response){
                var data = response.data;
                console.log(data);
                $scope.allUser = data;

            },
            function(response){
                // failure call back
            });

    };

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

    };

    $scope.logout = function () {
        delete $sessionStorage.user;
        $location.path('/login');
    };


    $scope.dowloadExcal = function () {
        $http.get(Path_Api.api_dowload_excal)
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
    }


    if($sessionStorage.user !== undefined){
        getPersonDoQuiz();
        getUserPage(1);

    }else{
        $scope.timeOut('sm',undefined);
    }


    $scope.totalItems = 65;
    $scope.currentPage = 1;

    $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;

    };

    $scope.pageChanged = function() {
        $log.log('Page changed to: ' + $scope.currentPage);
    };

    $scope.maxSize = 20;
    $scope.bigTotalItems = 650;
    $scope.bigCurrentPage = 1;


    $scope.$watch(function () { return $scope.bigCurrentPage; }, function (newData, oldData) {
        if(newData !== null){
            getUserPage(newData);
        }




    });



});

