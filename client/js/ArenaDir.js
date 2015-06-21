"use strict";

/**
 * Controls the arena
 */
app.directive("arena", function() {
	return {
		restrict: "E",
		templateUrl: "templates/arena.html",
		scope: {
			size: "&size",
			labels: "&labels"
		},
		controller: function($scope) {

			var getLabel = function(x, y) {
				var labels = $scope.labels();
				if (!labels) return;
				for (var i = 0; i < labels.length; i++) {
					if (labels[i].x === x && labels[i].y === y)
						return labels[i];
				}
				return { label: "" };
			};

			/**
			 * Creates a 2-dimensional array which represents the arena
			 */
			var draw = function(newVal, oldVal) {
				if (newVal === oldVal)
					return;
				// run coordinates from top to bottom since this is how the grid is supposed to be layed out
				var size = $scope.size();
				$scope.rows = [];
				for (var y = size - 1; y >= 0; y--) {
					var row = [];
					$scope.rows.push(row);
					for (var x = 0; x < size; x++) {
						var label = getLabel(x, y);
						row.push({
							label: label.label,
							style: {
								backgroundColor: label.color || ""
							}
						});
					}
				}
			};
			draw($scope.size);

			// watch size and labels and redraw on change
			$scope.$watch("labels()", draw);
			$scope.$watch("size()", draw);
		}
	};
});

