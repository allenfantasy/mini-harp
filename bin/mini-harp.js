#!/usr/bin/env node

var miniHarp = require("../index");
var argv = require('minimist')(process.argv.slice(2));

var port = argv.port || 4000;
var root = argv._[0];

var app = miniHarp(root || process.cwd());


console.log("Starting mini-harp on http://localhost:" + port);
app.listen(port);
