var app = angular.module('scramblerApp',[]);



app.controller('launchController',['$scope','$http',function($scope,$http){
	$scope.newTitle = "New Player";
	$scope.returnTitle = "Returning";
	$scope.rNotifyArea = "";
	$scope.nNotifyArea = "";
	$scope.loginView = true;
	$scope.launchView = false;

	$scope.login = function(v){
		var data = {
			newplayer: (v == "N" ? "Y" : "N"),
			login: (v == "N" ? $scope.nLogin : $scope.rLogin),
			password: (v == "N" ? $scope.nPassword : $scope.rPassword),
		}

		$http.post('/login',data).
			success(function(data,status,headers,config){
				if(data.type=="login"){
					//request is a login
					$scope.rNotifyArea = data.msg;
					if (data.users.length != 0){
						$scope.loginView = false;
						$scope.launchView = true;
					}
				} else {
					//request is a register
					if (data.code == 3){
						$scope.loginView = false;
						$scope.launchView = true;
					}
					$scope.nNotifyArea = data.msg;
				}
			}).
			error(function(data,status,headers,config){
				alert("A System error occured");
		});
	}
}]);