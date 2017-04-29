var app = angular.module("QuizPersonal", ["ngRoute","ngStorage",]);
app.config(function($routeProvider) {
    $routeProvider

        .when("/quiz", {
            templateUrl: "js/views/quiz.html",
            controller: "quizController"
        })


        .otherwise({
            redirectTo: '/login',
            templateUrl: 'js/views/login.html',
            controller: 'loginController'
        });
});




