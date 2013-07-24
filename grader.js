#!/usr/bin/env node

/*
	Automatically grade files for the presence of specified HTML tags/attributes. Uses commander.js and cheerio. Teach command line application development and basic DOM parsing.

*/

var fs = require('fs');
var program = require('commander');
var cheerio = require('cheerio');
var HTMLFILE_DEFAULT = 'index.html';
var CHECKSFILE_DEFAULT = 'checks.json';

//test to see if passed in file exists on file system. Exit with error code if file does not exist
var assertFileExists = function(infile) {
	var instr = infile.toString();
	if (!fs.existsSync(instr)) {
		console.log("%s does not exist. Exiting. ", instr);
		process.exit(1);
	}

	return instr;
};

//load html from file system
var cheerioHtmlFile = function(htmlfile) {
	return cheerio.load(fs.readFileSync(htmlfile));
};

//load check JSON from file system
var loadChecks = function(checkfile){
	return JSON.parse(fs.readFileSync(checkfile));
};

//looks for a particular html element or attribute within html file. Record into JSON object true or false for that element/attribute
var checkHtmlFile = function(htmlfile, checkfile){
	$ = cheerioHtmlFile(htmlfile);
	var checks = loadChecks(checkfile);
	var out = {};
	for(var ii in checks) {
		var present = $(checks[ii]).length > 0;
		out[checks[ii], present];
	}
	return out;
};

var clone = function(fn){
	//workaround for a commander.js issue
	return fn.bind({});
};

if (require.main == module){
	program
		.option('-c, --checks <check_file>', 'Path to checks.json', clone(assertFileExists), CHECKSFILE_DEFAULT)
		.option('-f, --file <html_file>', 'Path to index.html', clone(), HTMLFILE_DEFAULT)
		.parse(process.argv);

	var checkJson = checkHtmlFile(program.file, program.checks);
	var outJson = JSON.stringify(checkJson, null, 4);
	console.log(outJson);
} else {
	exports.checkHtmlFile = checkHtmlFile;
}




