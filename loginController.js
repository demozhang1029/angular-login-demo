angular
    .module('loginApp', ['ngResource', 'ngRoute'])
    .config(['$locationProvider', function($locationProvider) {
        $locationProvider.hashPrefix('');
    }])
    .config(['$routeProvider', function($routeProvider){
        $routeProvider
            .when("/", {
                templateUrl: 'login.html',
                controller: 'loginCtrl'
            })
            .when("/welcome", {
                templateUrl: 'welcome.html'
            });
    }])
    .controller('loginCtrl', ['$scope', '$resource', function($scope, $resource){
        var LOGIN_SUCCESS = 0;
        var CONNECT_FAIL = -1;
        $scope.login = () => {
            if ($scope.currentLocation == 'Select Location') {
                $scope.result = 'Please select an item in the list'
            }
            var LoginConn = $resource('http://localhost:8080/login');
            LoginConn.save({}, {'username': $scope.username, 'password': $scope.password},
                function (response) {
                    if (response.status == LOGIN_SUCCESS) {
                        $scope.result = 'Login Success';
                    } else {
                        $scope.result = 'You are not authenticated or your session expired. Please login.';
                    }
                },
                function (response) {
                    if (response.status == CONNECT_FAIL) {
                        $scope.result = 'Can\'t connect to service';
                    }
                });
        };
        $scope.locations = [
            'Select Location',
            'Registration Desk',
            'OPD-1',
            'General Ward',
            'Labour Ward'
        ];
        $scope.languages = [
            'en', 'es', 'fr', 'it', 'pt'
        ];
        $scope.usernamePlaceholder = 'Enter your username';
        $scope.passwordPlaceholder = 'Enter your password';
        $scope.currentLocation = 'Registration Desk';
    }]);