
(function(){
    angular
        .module('loginApp', ['ngResource', 'ngRoute'])
        .config(['$locationProvider', function($locationProvider) {
            $locationProvider.hashPrefix('');
        }])
        .config(['$routeProvider', function($routeProvider){
            $routeProvider
                .when("/", {
                    templateUrl: 'views/login.html',
                    controller: 'loginCtrl'
                })
                .when("/welcome", {
                    templateUrl: 'views/welcome.html'
                });
        }])
        .controller('loginCtrl', ['$scope', '$resource', 'toolService', 'constantService',function($scope, $resource, toolService, constantService){
            var isSelected = () => {
                return $scope.view.currentLocation != constantService.LOCATION_MSG.NULL;
            };

            $scope.login = () => {
                if (isSelected()) {
                    var LoginConn = $resource(constantService.URL.LOGIN_API);
                    LoginConn.save({}, {'username': $scope.username, 'password': $scope.password},
                        function (response) {
                            if (response.status == constantService.HTTP_STATUS.LOGIN_SUCCESS) {
                                $scope.result = constantService.SHOW_MSG.LOGIN_SUCCESS;
                                toolService.Jump(constantService.URL.JUMP);
                            } else {
                                $scope.result = constantService.SHOW_MSG.LOGIN_FAIL;
                            }
                        },
                        function (response) {
                            if (response.status == constantService.HTTP_STATUS.CONNECT_FAIL) {
                                $scope.result = constantService.SHOW_MSG.CONN_FAIL;
                            }
                        });
                } else {
                    $scope.result = constantService.SHOW_MSG.UN_SELECT;
                }
            };
            $scope.view = {
                locations: constantService.LOCATION,
                languages: constantService.LANGUAGE,
                placeholder: constantService.PLACEHOLDER,
                currentLocation: constantService.LOCATION_MSG.INIT
            };
        }])
        .factory('constantService', function() {
            return {
                LOCATION: ['Select Location', 'Registration Desk', 'OPD-1', 'General Ward', 'Labour Ward'],
                LANGUAGE: ['en', 'es', 'fr', 'it', 'pt'],
                PLACEHOLDER: {USERNAME: 'Enter your username', PASSWORD: 'Enter your password'},
                HTTP_STATUS: {LOGIN_SUCCESS: 0, CONNECT_FAIL: -1},
                LOCATION_MSG: {INIT: 'Registration Desk', NULL: 'Select Location'},
                URL: {LOGIN_API: 'http://localhost:8080/login', JUMP: '/welcome'},
                SHOW_MSG: {
                    LOGIN_SUCCESS: 'Login Success',
                    LOGIN_FAIL: 'You are not authenticated or your session expired. Please login.',
                    CONN_FAIL: 'Can\'t connect to service',
                    UN_SELECT: 'Please select an item in the list'
                }
            };
        })
        .factory('toolService', ['$location', function($location){
            var jumpPath = (url) => {
                $location.path(url);
            };
            return {
                Jump: function(url) {jumpPath(url);}
            };
        }]);
})();

