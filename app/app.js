var app = angular.module("App", ["ngSanitize", "ngRoute", "timer"]).config(function () {

});


app.config(["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        $routeProvider.when("/", {
            templateUrl: "templates/start.html",
            controller: "HomeCtrl"
        }).when("/about", {
            templateUrl: "templates/about.html",
            controller: "AboutCtrl"
        }).when("/question", {
            templateUrl: "templates/question.html",
            controller: "QuestionCtrl"
        }).when("/finish", {
            templateUrl: "templates/finish.html",
            controller: "FinishCtrl"
        }).otherwise({redirectTo: '/'});
    }]);

app.run(function ($rootScope, $http) {
    $rootScope.nowYear = new Date().getFullYear();
    $rootScope.inGame = false;
    $rootScope.correct = 0;
    $rootScope.headerTemplate = '/templates/header.html';
    $rootScope.footerTemplate = '/templates/footer.html';

    $http.get('/app/questions.json')
            .then(function (res) {
                $rootScope.quizData = res.data;
            });
});

app.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
});