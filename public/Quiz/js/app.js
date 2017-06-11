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
        path_test : "image/test.jpg",
        path_test_url : "image/CDSposter5.jpg",

        path_image_analyst_Front : "image/NFP&NFJ&FRONT.jpg",
        path_image_analyst_Back : "image/NFP&NFJ&BACK.jpg",
        path_image_diplomat_Front : "image/NTJ&NTP&FRONT.jpg",
        path_image_diplomat_Back : "image/NTJ&NTP&BACK.jpg",
        path_image_sentinel_Front : "image/STJ&SFJ&FRONT.jpg",
        path_image_sentinel_Back : "image/STJ&SFJ&BACK.jpg",
        path_image_explorer_Front : "image/STP&SFP&FRONT.jpg",
        path_image_explorer_Back : "image/STP&SFP&BACK.jpg",

        api_login: "/api/user/login",
        api_post_question : "/api/answer",
        api_get_question : "/api/question/",
        api_get_check_all_question : "/api/answer/after/",
        api_get_all_user_admin : "/api/answer/get",
        api_dowload_excal : "/api/ExportExcel",
        api_get_one_user : "/api/user/",


    };
});

