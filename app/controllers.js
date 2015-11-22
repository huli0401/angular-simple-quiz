app.controller('HomeCtrl', function ($scope, $location, $rootScope) {
    $rootScope.inGame = false;
    $scope.start = function () {
        // set inGame status
        $rootScope.inGame = true;
        $location.path('/question');
    };
});
app.controller('FinishCtrl', function ($rootScope) {
    $rootScope.inGame = false;
});
app.controller('QuestionCtrl', function ($scope, $rootScope, $location, $timeout, $document) {
    // check for hackers
    $scope.questionTime = 10;
    if ($rootScope.inGame === false) {
        $location.path('/');
    } else {
        $scope.expire = function () {
            $scope.answer(5);
            $scope.$apply();
        };

        $rootScope.correct = 0;
        $scope.item = $rootScope.quizData[Math.floor(Math.random() * $rootScope.quizData.length)];
        $scope.q = $scope.item.q;
        $scope.r = $scope.item.r;
        $scope.ans = $scope.item.ans;
        $scope.ans[0].cs = '';
        $scope.ans[1].cs = '';
        $scope.ans[2].cs = '';
        $scope.ans[3].cs = '';
        $scope.answer = function (data) {
            $document.find('timer')[0].stop();
            var na = $scope.item.ans;
            na[0].cs = 'disabled';
            na[1].cs = 'disabled';
            na[2].cs = 'disabled';
            na[3].cs = 'disabled';
            na[$scope.item.r].cs = 'disabled btn-success';
            $scope.ans = na;
            if ($scope.r == data) {
                // correct answer
                $rootScope.correct++;
                $timeout(function () {
                    $scope.newQuestion();
                }, 3000);

            } else {
                // wrong answer
                if (data < 5) {
                    $scope.ans[data].cs = 'disabled btn-danger';
                }
                $timeout(function () {
                    $location.path('/finish');
                }, 3000);
            }
        }
    }
    ;
    $scope.newQuestion = function () {
        $scope.item = $rootScope.quizData[Math.floor(Math.random() * $rootScope.quizData.length)];
        $scope.q = $scope.item.q;
        $scope.r = $scope.item.r;
        $scope.ans[0].cs = '';
        $scope.ans[1].cs = '';
        $scope.ans[2].cs = '';
        $scope.ans[3].cs = '';
        $scope.ans = $scope.item.ans;
        $document.find('timer')[0].setCDSeconds($scope.questionTime);

    };
});
app.controller('AboutCtrl', function ($scope, $rootScope) {
    $rootScope.inGame = false;
});