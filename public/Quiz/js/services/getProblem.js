
app.factory('problem', function($http,Path_Api,$q) {
    var urlBase = Path_Api.api_get_question;
    var problem = {};

    problem.getData = function (id) {
        return $http.get(urlBase+id);
    };
    return problem;
});