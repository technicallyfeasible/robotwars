"use strict";

/**
 * Controls the arena
 */
app.controller("DiningCtrl", ["$scope", "ApiSvc", function($scope, api) {

	$scope.sizeOptions = [3, 5, 7, 9];
	$scope.dinerOptions = [2, 3, 4, 5];
	$scope.size = 3;
	$scope.dinerCount = 2;

	$scope.diners = [];

	$scope.create = function(resize) {
		var diners = $scope.diners;
		if (!resize)
			diners.splice(0, diners.length);
		// remove some if too many or add some if too few
		if (diners.length > $scope.dinerCount)
			diners.splice($scope.dinerCount, diners.length - $scope.dinerCount);
		else {
			var count = ($scope.dinerCount - diners.length);
			for (var i = 0; i < count; i++) {
				diners.push({
					x: 0,
					y: parseInt($scope.size / 2) + 1,
					dir: 1,
					moves: ""
				});
			}
		}
	};
	$scope.run = function() {
		// reset diners to starting position
		$scope.diners.forEach(function(diner) {
			diner.x = 0;
			diner.y = parseInt($scope.size / 2) + 1;
			diner.dir = 1;
		});
		// run through the api and display response
		api.run($scope.size, $scope.diners).success(function(response) {

		});
	};

	// adjust input fields based on number of diners selected
	$scope.$watch("dinerCount", function() {
		$scope.create(true);
	});

}]);
