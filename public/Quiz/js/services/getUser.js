
app.factory('getOneUser', function($http,Path_Api) {
    var urlBase = Path_Api.api_get_one_user;
    var problem = {};

    problem.getData = function (user_id) {
        return $http.get(urlBase+user_id);
    };
    return problem;
});