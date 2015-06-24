var tests = [];
for (var file in window.__karma__.files) {
	if (window.__karma__.files.hasOwnProperty(file)) {
		if (/.spec\.js$/.test(file)) {
			tests.push(file);
		}
	}
}

requirejs.config({
	// Karma serves files from "/base"
	baseUrl: "/base/client",

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

	// ask Require.js to load these files (all our tests)
	deps: tests,

	// start test run, once Require.js is done
	callback: window.__karma__.start
});
