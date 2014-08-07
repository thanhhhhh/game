var app = angular.module('scramblerApp',[]);

app.controller('loginController',['$scope','$http',function($scope,$http){
	$scope.msg = "HELLO";
	$scope.test = function(){

		var data = {
			name: $scope.nameText,
			id: "999"
		}
		$http.post('/login?params={"ss":"sssssss"}',data).
			success(function(data,status,headers,config){
				console.log(data);
			}).
			error(function(data,status,headers,config){
				console.log("ERR");
			});
	}
}]);