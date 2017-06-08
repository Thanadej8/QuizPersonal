var app = angular.module("QuizPersonal", ["ngRoute","ngStorage","timer",'ui.bootstrap']);
app.config(function($routeProvider) {
    $routeProvider

        .when("/login", {
            templateUrl: "js/views/login.html",
            controller: "loginController"
        })


        .when("/quiz/:user_id", {
            templateUrl: "js/views/quiz.html",
            controller: "quizController"
        })
        .when("/showtypeperson/:user_id", {
            templateUrl: "js/views/showTypePerson.html",
            controller: "showTypePersonController"
        })
        .when("/admin/:user_id", {
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
        path_image_analyst_1 : "image/NFP&NFJ.jpg",
        path_image_diplomat_1 : "image/NTJ&NTP.jpg",
        path_image_sentinel_1 : "image/STJ&SFJ.jpg",
        path_image_explorer_1 : "image/STP&SFP.jpg",

        api_login: "/api/user/login",
        api_post_question : "/api/answer",
        api_get_question : "/api/question/",
        api_get_check_all_question : "/api/answer/after/",
        api_get_all_user_admin : "/api/answer/get",
        api_dowload_excal : "/api/ExportExcel",
        api_get_one_user : "/api/user/",


    };
});

