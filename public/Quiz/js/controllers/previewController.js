
app.controller('previewController',function($scope,$localStorage,$routeParams,$http,$location,$rootScope) {


    $scope.go = function (path) {
        $location.path(path);
    }


});

