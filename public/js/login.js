var app = angular.module('scramblerApp',[]);

app.controller('loginController',['$scope','$http',function($scope,$http){
	$scope.newTitle = "Login";
	$scope.existingTitle = "Returning";
	$scope.login = function(v){


		var data = {
			newplayer: (v == "N" ? "N" : "Y"),
			login: (v == "N" ? $scope.nLogin : $scope.eLogin),
			password: (v == "E" ? $scope.ePassword : $scope.nPassword),
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