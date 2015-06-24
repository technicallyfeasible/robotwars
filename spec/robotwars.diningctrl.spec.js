describe("DiningCtrl", function() {

	require(["angular-mocks", "js/DiningCtrl"], function() {
		beforeEach(module("app"));

		var diningCtrl, scope;

		beforeEach(inject(function ($rootScope, $controller) {
			scope = $rootScope.$new();
			diningCtrl = $controller("DiningCtrl", {
				$scope: scope
			});
		}));

		it("allows selection of different sizes", function () {
			expect(scope.sizeOptions).not.toBeUndefined();
			expect(scope.sizeOptions.length).toEqual(4, "number of options");
		});

	});

});
