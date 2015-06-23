"use strict";

/**
 * Controls the arena
 */
define(["app", "lodash", "js/ApiSvc"], function(app, _) {

	app.controller("DiningCtrl", ["$scope", "ApiSvc", function ($scope, api) {

		$scope.sizeOptions = [4, 6, 8, 10];
		$scope.dinerOptions = [2, 3, 4, 5];
		$scope.size = 4;
		$scope.dinerCount = 2;
		$scope.isRunning = false;

		$scope.diners = [];
		$scope.targets = [];
		$scope.labels = [];

		/**
		 * Create the diners and randomly choose new target positions
		 * @param resize
		 */
		$scope.create = function (resize) {
			var diners = $scope.diners;
			if (!resize)
				diners.splice(0, diners.length);
			// start in the middle
			var startY = parseInt($scope.size / 2);
			var i;
			// remove some if too many or add some if too few
			if (diners.length > $scope.dinerCount)
				diners.splice($scope.dinerCount, diners.length - $scope.dinerCount);
			else {
				var count = ($scope.dinerCount - diners.length);
				for (i = 0; i < count; i++) {
					diners.push({
						x: 0,
						y: startY,
						dir: 'E',
						moves: ""
					});
				}
			}

			// recreate labels
			var targets = $scope.targets;
			if (!resize)
				targets.splice(0, targets.length);
			// first: random target position for each diner
			var target, checkTarget = function (t) {
				return (!target.x && target.y === startY) || (t.x === target.x && t.y === target.y);
			};
			for (i = 0; i < $scope.dinerCount; i++) {
				do {
					target = {
						x: parseInt(Math.random() * $scope.size),
						y: parseInt(Math.random() * $scope.size)
					};
					// check if it exists
				} while (_.any($scope.targets, checkTarget));
				$scope.targets.push(target);
			}

			updateLabels();
		};

		var updateLabels = function () {
			$scope.labels = [];
			var diners = $scope.diners, targets = $scope.targets;
			for (var i = 0; i < $scope.dinerCount; i++) {
				var diner = diners[i], target = targets[i];
				var color = (diner.x === target.x && diner.y === target.y ? "#00FF00" : "#FF0000");
				// add current position
				$scope.labels.push({x: diner.x, y: diner.y, label: "D" + (i + 1), color: color});
				// add target position
				$scope.labels.push({x: target.x, y: target.y, label: "" + (i + 1)});
			}
		};

		/**
		 * Ask the api where our diners will end up
		 */
		$scope.run = function () {
			if ($scope.isRunning)
				return;
			$scope.isRunning = true;
			// reset diners to starting position
			$scope.diners.forEach(function (diner) {
				diner.x = 0;
				diner.y = parseInt($scope.size / 2);
				diner.dir = 'E';
			});
			// run through the api and display response
			api.run($scope.size, $scope.diners).success(function (res) {
				$scope.isRunning = false;

				var i;
				// update diner positions
				for (i = 0; i < res.robots.length; i++) {
					var diner = $scope.diners[i];
					$scope.diners[i] = res.robots[i];
					$scope.diners[i].moves = diner.moves;
				}
				updateLabels();
			});
		};

		// adjust input fields based on number of diners selected or arena size
		$scope.$watch("dinerCount", function () {
			$scope.create(true);
		});
		$scope.$watch("size", function () {
			$scope.create(true);
		});

	}]);

	return app;
});
