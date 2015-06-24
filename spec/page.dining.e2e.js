describe("Dining Page", function() {

	beforeEach(function() {
		browser.get("http://localhost:3000/dev");
	});

	it('should have a title', function() {
		expect(browser.getTitle()).toEqual("Seat the Diner");
	});

	it("displays select with arena size", function() {
		var select = element(by.model("size"));
		expect(element).not.toBeUndefined();
	});

});
