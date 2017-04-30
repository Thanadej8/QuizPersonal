
app.factory('problem', function($http) {
    var urlBase = "/";
    var problem = {};

    problem.getData = function (id) {
        return $http.get(urlBase+"/"+id);
    };
    return problem;
});