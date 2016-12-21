var app = angular.module('loginModule', ['ngResource']);

app.controller('loginCtrl', ($scope, $resource) => {
	$scope.login = () => {
		if ($scope.currentLocation == 'Select Location') {
			$scope.result = 'Please select an item in the list'
		}

		var LoginConn = $resource('http://localhost:8080/login');
		LoginConn.save({}, {'username':$scope.username, 'password':$scope.password},
			function(response){
				if (response.status == 0) {
					$scope.result = 'Login Success';
				}else {
					$scope.result = 'You are not authenticated or your session expired. Please login.';
				}
			},
			function(response){
				if (response.status == -1) {
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
		'en','es','fr','it','pt'
	];
	$scope.usernamePlaceholder = 'Enter your username';
	$scope.passwordPlaceholder = 'Enter your password';
	$scope.currentLocation = 'Registration Desk';
});