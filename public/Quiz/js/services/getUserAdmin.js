
app.factory('getUserAdmin', function($http,Path_Api) {
    var urlBase = Path_Api.api_get_user_admin;
    var problem = {};

    problem.getData = function (page) {
        return $http.get(urlBase+page);
    };
    return problem;
});