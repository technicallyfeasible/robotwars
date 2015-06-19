"use strict";

/**
 * Controls the arena
 */
app.directive("arena", function() {
	return {
		restrict: "E",
		templateUrl: "templates/arena.html",
		scope: {
			size: "=size",
			diners: "=diners"
		},
		controller: function($scope) {

			/**
			 * Creates a 2-dimensional array which represents the arena
			 * @param size
			 */
			var draw = function(size) {
				// run coordinates from top to bottom since this is how the grid is supposed to be layed out
				$scope.rows = [];
				for (var y = size - 1; y >= 0; y--) {
					var row = [];
					$scope.rows.push(row);
					for (var x = 0; x < size; x++) {
						for (var i = 0; i < $scope.diners.length; i++) {

						}
						row.push({
							label: ""
						});
					}
				}
			};

			// watch size and redraw on change
			$scope.$watch("size", draw);
		}
	};
});

