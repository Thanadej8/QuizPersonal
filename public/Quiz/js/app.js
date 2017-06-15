var app = angular.module("QuizPersonal", ["ngRoute","ngStorage","timer",'ui.bootstrap','djds4rce.angular-socialshare']);

app.config(function($locationProvider){
    $locationProvider.html5Mode({
        enabled: false,
        requireBase: false
    });
});
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
        .when("/showtypeperson", {
            templateUrl: "js/views/showTypePerson.html",
            controller: "showTypePersonController"
        })
        .when("/admin/", {
            templateUrl: "js/views/admin.html",
            controller: "adminController"
        })


        .otherwise({
            redirectTo: '/preview',
            templateUrl: 'js/views/preview.html',
            controller : "previewController"
        });
});
app.run(function($FB){
    $FB.init('245317315872785'); // Country code format example: fr_FR
});

app.factory('Path_Api', function() {
    return {
        //image

        path_image_analyst_Front : "image/NTP&NTJ&FRONT.png",
        path_image_analysy_Front_url : "http://quiz-personal.herokuapp.com/Quiz/image/NTP&NTJ&FRONT.png",

        path_image_analyst_Back : "image/NTP&NTJ&BACK.png",
        path_image_analysy_Back_url : "http://quiz-personal.herokuapp.com/Quiz/image/NTP&NTJ&BACK.png",

        path_image_diplomat_Front : "image/NFP&NFJ&FRONT.png",
        path_image_diplomat_Front_url : "http://quiz-personal.herokuapp.com/Quiz/image/NFP&NFJ&FRONT.png",

        path_image_diplomat_Back : "image/NFP&NFJ&BACK.png",
        path_image_diplomat_Back_url : "http://quiz-personal.herokuapp.com/Quiz/image/NFP&NFJ&BACK.png",

        path_image_sentinel_Front : "image/STJ&SFJ&FRONT.png",
        path_image_sentinel_Front_url : "http://quiz-personal.herokuapp.com/Quiz/image/STJ&SFJ&FRONT.png",

        path_image_sentinel_Back : "image/STJ&SFJ&BACK.png",
        path_image_sentinel_Back_url : "http://quiz-personal.herokuapp.com/Quiz/image/STJ&SFJ&BACK.png",

        path_image_explorer_Front : "image/STP&SFP&FRONT.png",
        path_image_explorer_Front_url : "http://quiz-personal.herokuapp.com/Quiz/image/STP&SFP&FRONT.png",

        path_image_explorer_Back : "image/STP&SFP&BACK.png",
        path_image_explorer_Back_url : "http://quiz-personal.herokuapp.com/Quiz/image/STP&SFP&BACK.png",

        api_login: "/api/user/login",
        api_post_question : "/api/answer",
        api_get_question : "/api/question/",
        api_get_check_all_question : "/api/answer/after/",
        api_get_all_user_admin : "/api/answer/get",
        api_dowload_excal : "/api/ExportExcel",
        api_get_one_user : "/api/user/",
        api_get_user_admin : "/api/answer/get/"

    };
});

