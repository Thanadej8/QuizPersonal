
app.controller('showTypePersonController',function($scope,$localStorage,$routeParams,$http,$location,$rootScope,$uibModal,$log,getOneUser) {
    $scope.user = $localStorage.user;
    $localStorage.user_id = $routeParams.user_id;

    $scope.viewAnalyst = false;
    $scope.viewDiplomat = false;
    $scope.viewSentinel = false;
    $scope.viewExploer = false;
    $scope.image = "";
    $scope.go = function (path) {
        $location.path(path);
    }
    getUser($localStorage.user_id);
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
    if($localStorage.user === undefined){
        $scope.timeOut('lg',undefined);
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
        }else if(type === "NFP" || type === "NFJ"){
            $scope.viewDiplomat = true;
        }else if(type === "STJ" || type === "SFJ"){
            $scope.viewSentinel = true;
        }else if(type === "STP" || type === "SFP"){
            $scope.viewExploer = true;
        }
    }

});

