
app.controller('adminController',function($scope,$localStorage,$routeParams,$http,$location,$rootScope,$uibModal,$log,allUser,Path_Api,getOneUser,$sessionStorage) {

    $scope.user = $sessionStorage.user;

    $scope.go = function (path) {
        $location.path(path);
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
        $scope.getAllUser();

    }else{
        $scope.timeOut('sm',undefined);
    }
});

