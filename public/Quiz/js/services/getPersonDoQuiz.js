
app.factory('PersonDoQuiz', function($http,Path_Api) {
    var urlBase = Path_Api.api_get_person_do_quiz;
    var problem = {};

    problem.getData = function () {
        return $http.get(urlBase);
    };
    return problem;
});
