
app.controller('showTypePersonController',function($scope,$localStorage,$routeParams,$http,$location,$rootScope,$uibModal,$log,getOneUser,Path_Api,$sessionStorage) {

    $scope.user = $sessionStorage.user;
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
                $sessionStorage.user = data[0];
                $scope.user = $sessionStorage.user;
                analysisData($sessionStorage.user.person_type1,$sessionStorage.user.person_type2,$sessionStorage.user.person_type2)
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
        delete $sessionStorage.user;
        $location.path('/login');
    }

    
    function analysisData(type1,type2,type3) {
        var type = type1+type2+type3;
        console.log(type);
        if(type === "NTJ" || type === "NTP"){
            $scope.viewAnalyst = true;
            if($scope.user.job === "Front"){
                $scope.image = Path_Api.path_image_analyst_Front;
            }else if($scope.user.job === "Back"){
                $scope.image = Path_Api.path_image_analyst_Back;
            }

        }else if(type === "NFP" || type === "NFJ"){
            $scope.viewDiplomat = true;
            if($scope.user.job === "Front"){
                $scope.image = Path_Api.path_image_diplomat_Front;
            }else if($scope.user.job === "Back"){
                $scope.image = Path_Api.path_image_diplomat_Back;
            }

        }else if(type === "STJ" || type === "SFJ"){
            $scope.viewSentinel = true;
            if($scope.user.job === "Front"){
                $scope.image = Path_Api.path_image_sentinel_Front;
            }else if($scope.user.job === "Back"){
                $scope.image = Path_Api.path_image_sentinel_Back;
            }

        }else if(type === "STP" || type === "SFP"){
            $scope.viewExploer = true;
            if($scope.user.job === "Front"){
                $scope.image = Path_Api.path_image_explorer_Front;
            }else if($scope.user.job === "Back"){
                $scope.image = Path_Api.path_image_explorer_Back;
            }

        }
    }

    if($sessionStorage.user !== undefined){
        getUser($sessionStorage.user.user_id);
    }else{
        $scope.timeOut('sm',undefined);
    }

});

