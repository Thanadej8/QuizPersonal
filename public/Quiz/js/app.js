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

        path_image_analyst_Front : "/Quiz/image/analyst_front.jpg",
        path_image_analysy_Front_url : "http://test.cds-unlockupower.com/Quiz/image/analyst_front.jpg",

        path_image_analyst_Back : "/Quiz/image/analyst_back.jpg",
        path_image_analysy_Back_url : "http://test.cds-unlockupower.com/Quiz/image/analyst_back.jpg",

        path_image_diplomat_Front : "/Quiz/image/diplomat_front.jpg",
        path_image_diplomat_Front_url : "http://test.cds-unlockupower.com/Quiz/image/diplomat_front.jpg",

        path_image_diplomat_Back : "/Quiz/image/diplomat_back.jpg",
        path_image_diplomat_Back_url : "http://test.cds-unlockupower.com/Quiz/image/diplomat_back.jpg",

        path_image_sentinel_Front : "/Quiz/image/sentinel_front.jpg",
        path_image_sentinel_Front_url : "http://test.cds-unlockupower.com/Quiz/image/sentinel_front.jpg",

        path_image_sentinel_Back : "/Quiz/image/sentinel_back.jpg",
        path_image_sentinel_Back_url : "http://test.cds-unlockupower.com/Quiz/image/sentinel_back.jpg",

        path_image_explorer_Front : "/Quiz/image/explorer_front.jpg",
        path_image_explorer_Front_url : "http://test.cds-unlockupower.com/Quiz/image/explorer_front.jpg",

        path_image_explorer_Back : "/Quiz/image/explorer_back.jpg",
        path_image_explorer_Back_url : "http://test.cds-unlockupower.com/Quiz/image/explorer_back",

        api_login: "/index.php/api/user/login",
        api_post_question : "/index.php/api/answer",
        api_get_question : "/index.php/api/question/",
        api_get_check_all_question : "/index.php/api/answer/after/",
        api_get_all_user_admin : "/index.php/api/answer/get",
        api_dowload_excal : "/index.php/api/ExportExcel",
        api_get_one_user : "/index.php/api/user/",
        api_get_user_admin : "/index.php/api/answer/get/"

    };
});