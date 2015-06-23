define(["angular", "angular-ui-router"], function(angular) {

	var app = angular.module("app", ["ui.router"]);

	app.config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {
		$stateProvider.state("/", {
			templateUrl: "templates/dining.html",
			controller: "DiningCtrl"
		});
		$urlRouterProvider.otherwise("/");
	}]);

	app.run(["$rootScope", "$state", function ($rootScope, $state) {
		$state.go("/");
	}]);

	return app;
});
