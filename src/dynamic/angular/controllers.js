var app = angular.module('winners', []);

app.config(function($interpolateProvider){
	$interpolateProvider.startSymbol('{[{').endSymbol('}]}');
})

app.controller('WinnersCtrl', ['$scope', function($scope) {
	var vm = $scope;
	vm.test [
		{
			text: 'world';
		}
	]= 'hello';
}]);
