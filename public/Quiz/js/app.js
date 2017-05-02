var app = angular.module("QuizPersonal", ["ngRoute","ngStorage","timer"]);
app.config(function($routeProvider) {
    $routeProvider

        .when("/login", {
            templateUrl: "js/views/login.html",
            controller: "loginController"
        })


        .when("/quiz", {
            templateUrl: "js/views/quiz.html",
            controller: "quizController"
        })
        .when("/showtypeperson/:user_id", {
            templateUrl: "js/views/showTypePerson.html",
            controller: "showTypePersonController"
        })
        .when("/admin", {
            templateUrl: "js/views/admin.html",
            controller: "adminController"
        })


        .otherwise({
            redirectTo: '/preview',
            templateUrl: 'js/views/preview.html',
            controller : "previewController"
        });
});




