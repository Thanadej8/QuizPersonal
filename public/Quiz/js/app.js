var app = angular.module("QuizPersonal", ["ngRoute","ngStorage","timer"]);
app.config(function($routeProvider) {
    $routeProvider

        .when("/quiz", {
            templateUrl: "js/views/quiz.html",
            controller: "quizController"
        })
        .when("/showtypeperson/:user_id", {
            templateUrl: "js/views/showTypePerson.html",
            controller: "showTypePersonController"
        })


        .otherwise({
            redirectTo: '/login',
            templateUrl: 'js/views/login.html',
            controller: 'loginController'
        });
});




