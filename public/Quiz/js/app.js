var app = angular.module("QuizPersonal", ["ngRoute","ngStorage","timer",'ui.bootstrap']);
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


app.factory('Path_Api', function() {
    return {
        //image

        api_login: "/api/user/login",
        api_post_question : "/api/answer",
        api_get_question : "/api/question/",
        api_get_check_all_question : "/api/answer/after/",
        api_get_all_user_admin : "/api/answer/",
        api_dowload_excal : "/api/ExportExcel",
        api_get_one_user : "/api/user/",

    };
});

