/**
 * Created by user on 2016/4/7.
 */
'use strict';

var chai = require('chai');

var expect = chai.expect;
var assert = chai.assert;
var should = chai.should;

var path = require('path');
var upath = require('../src/index.js');

function path_relative(to)
{
	return path.relative(__dirname + '/../', to);
}

function lazyassert()
{

}

describe(path_relative(__filename), function ()
{
	describe('path.sep', function ()
	{
		it(`path.sep = ${ upath.SEP_UNIX }`, function () {
			assert.equal(upath.sep, upath.SEP_UNIX);
		});

		it(`path.win32.sep = ${ upath.SEP_WIN32 }`, function () {
			assert.equal(upath.win32.sep, upath.SEP_WIN32);
		});

		it(`path.posix.sep = ${ upath.SEP_UNIX }`, function () {
			assert.equal(upath.posix.sep, upath.SEP_UNIX);
		});
	});
});