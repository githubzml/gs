app.controller("myCtrl",["$scope","$http",function($scope,$http){
	$scope.msg = "hello";
	$http({
		url:"http://localhost:8080/home"
	}).then(function(result){
		$scope.data = result.data;
	},function(error){
		return -1;
	})
}])