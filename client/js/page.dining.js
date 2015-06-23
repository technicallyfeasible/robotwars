requirejs.config({
	// Karma serves files from "/base"
	baseUrl: "/dev",

	paths: {
		"app": "js/app",
		"lodash": "lib/lodash/lodash.min",
		"angular": "lib/angular/angular",
		"angular-ui-router": "lib/angular-ui-router/release/angular-ui-router",
		"angular-mocks": "lib/angular-mocks/angular-mocks"
	},

	shim: {
		"lodash": {
			exports: "_"
		},
		"angular": {
			exports: "window.angular"
		},
		"angular-ui-router": {
			deps: ["angular"],
			exports: "window.angular"
		},
		"angular-mocks": {
			deps: ["angular"],
			exports: "angular.mock"
		}
	},

	// ask Require.js to load these files for the page
	deps: ["app", "js/DiningCtrl", "js/ArenaDir"],

	// start angular bootstrap process once our files are loaded
	callback: function() {
		angular.bootstrap(document, ["app"]);
	}
});
