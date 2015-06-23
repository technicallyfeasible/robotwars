describe("DiningCtrl", function() {

	define(["angular-mocks", "js/DiningCtrl"], function() {
		beforeEach(module("app"));

		var diningCtrl, scope;

		beforeEach(inject(function ($rootScope, $controller) {
			scope = $rootScope.$new();
			diningCtrl = $controller("DiningCtrl", {
				$scope: scope
			});
		}));

		it("is cool", function () {
			expect(1).toEqual(1);
		});
	});

});
