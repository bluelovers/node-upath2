/**
 * Created by user on 2016/4/6.
 */
"use strict";

var chai = require('chai');

var expect = chai.expect;
var assert = chai.assert;
var should = chai.should;

var path = require('path');
var upath = require('../src/index.js');

var assert_helper = require('./assert.config.js');

var cfg = assert_helper.cfg(upath);

describe(path_relative(__filename), function ()
{


	equal('normalize');
	equal('join');
	equal('formatify');
	equal('isAbsolute');
	equal('septrim');
});

function path_relative(to)
{
	return path.relative(__dirname + '/../', to);
}

function equal(name, title, map)
{
	describe(title || cfg[name].title || name, function ()
	{
		// var _map = Object.assign([], cfg[name].map, map);
		var _map = [].concat([], cfg[name].map || [], map || []);

		//console.log(_map);

		for (let i in _map)
		{

			//console.log([upath[name].apply(upath, _map[i][0]), _map[i][1]]);

			let argv = _map[i][0], value = _map[i][1];

			it(`${ argv } => ${ value }`, function () {
				assert.equal(upath[name].apply(upath, argv), value);
			});
		}
	});
}

