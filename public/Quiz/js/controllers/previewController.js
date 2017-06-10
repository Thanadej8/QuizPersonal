
app.controller('previewController',function($scope,$localStorage,$routeParams,$http,$location,$rootScope,$sessionStorage) {


    $scope.go = function (path) {
        $location.path(path);
    }


});

