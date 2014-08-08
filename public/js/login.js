var app = angular.module('scramblerApp',[]);

app.controller('loginController',['$scope','$http',function($scope,$http){
	$scope.newTitle = "New Player";
	$scope.returnTitle = "Returning";
	$scope.login = function(v){
		var data = {
			newplayer: (v == "N" ? "Y" : "N"),
			login: (v == "N" ? $scope.nLogin : $scope.rLogin),
			password: (v == "N" ? $scope.nPassword : $scope.rPassword),
		}

		$http.post('/login',data).
			success(function(data,status,headers,config){
				console.log(data);
			}).
			error(function(data,status,headers,config){
				console.log("ERR");
		});
	}
}]);