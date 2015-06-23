"use strict";

/**
 * Controls the arena
 */
define(["app"], function(app) {

	app.service("ApiSvc", ["$http", function ($http) {

		var base = "";

		return {
			run: function (size, diners) {
				return $http.post(base + "/arena/run", {
					arena: {
						top: size - 1, right: size - 1
					},
					robots: diners
				})
			}
		};
	}]);

});
