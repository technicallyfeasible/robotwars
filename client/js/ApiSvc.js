"use strict";

/**
 * Controls the arena
 */
app.service("ApiSvc", ["$http", function($http) {

	var base = "";

	return {
		run: function(size, diners) {
			return $http.post(base + "/arena/run", {
				arena: {
					width: size, height: size
				},
				robots: diners
			})
		}
	};
}]);

