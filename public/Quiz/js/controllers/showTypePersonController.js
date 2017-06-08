
app.controller('showTypePersonController',function($scope,$localStorage,$routeParams,$http,$location,$rootScope,$uibModal,$log,getOneUser,Path_Api) {

    $localStorage.user_id = $routeParams.user_id;
    $scope.viewAnalyst = false;
    $scope.viewDiplomat = false;
    $scope.viewSentinel = false;
    $scope.viewExploer = false;
    $scope.image = "";

    $scope.go = function (path) {
        $location.path(path);
    }


    function getUser(user_id) {

        getOneUser.getData(user_id).then(
            function(response){
                var data = response.data;
                console.log(data[0]);
                $localStorage.user = data[0];
                $scope.user = $localStorage.user;
                analysisData($scope.user.person_type1,$scope.user.person_type2,$scope.user.person_type3)
            },
            function(response){
                // failure call back
            });

    }

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

    
    function analysisData(type1,type2,type3) {
        var type = type1+type2+type3;
        console.log(type);
        if(type === "NTJ" || type === "NTP"){
            $scope.viewAnalyst = true;
            $scope.image = Path_Api.path_image_analyst_1;
        }else if(type === "NFP" || type === "NFJ"){
            $scope.viewDiplomat = true;
            $scope.image = Path_Api.path_image_diplomat_1;
        }else if(type === "STJ" || type === "SFJ"){
            $scope.viewSentinel = true;
            $scope.image = Path_Api.path_image_sentinel_1;
        }else if(type === "STP" || type === "SFP"){
            $scope.viewExploer = true;
            $scope.image = Path_Api.path_image_explorer_1;
        }
    }

    if($localStorage.user_id !== null){
        getUser($localStorage.user_id);
    }else{
        $scope.timeOut('sm',undefined);
    }

});

