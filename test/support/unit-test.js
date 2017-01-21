var Jasmine = require('jasmine');
var jasmine = new Jasmine();

jasmine.loadConfig({
	"spec_dir": "test/unit",
	"spec_files": [
		"**/*[sS]pec.js"
	],
	"stopSpecOnExpectationFailure": false,
	"random": false
});
jasmine.configureDefaultReporter({
	showColors: true
});
jasmine.execute();