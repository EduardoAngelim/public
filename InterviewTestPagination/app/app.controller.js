angular.module('todoApp').controller('TodoAppController', function ($scope, $http) {

	$scope.settings = {
		currentPage: 0,
		offset: 0,
		pageLimit: 20
	};
});