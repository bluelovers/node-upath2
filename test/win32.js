/**
 * Created by user on 2016/4/7.
 */
/**
 * Created by user on 2016/4/6.
 */
"use strict";

var chai = require('chai');

var expect = chai.expect;
var assert = chai.assert;
var should = chai.should;

var path = require('path');
var upath = require('../src/index.js').win32;

function path_relative(to)
{
	return path.relative(__dirname + '/../', to);
}

function lazyassert()
{

}

describe(path_relative(__filename), function ()
{
	describe('path.normalize(path)', function ()
	{
		var _map = {
			'c:/windows/nodejs/path': 'c:\\windows\\nodejs\\path',
			'c:/windows/../nodejs/path': 'c:\\nodejs\\path',
			'c:\\windows\\nodejs\\path': 'c:\\windows\\nodejs\\path',
			'c:\\windows\\..\\nodejs\\path': 'c:\\nodejs\\path',
			'//windows\\unix/mixed': '\\windows\\unix\\mixed',
			'\\windows//unix/mixed': '\\windows\\unix\\mixed',
			'\\\\windows//unix/mixed': '\\windows\\unix\\mixed',
			'////\\windows\\..\\unix/mixed/': '\\unix\\mixed\\',

			'////\\windows\\////\\////\\..\\////\\////\\unix/////\\mixed/': '\\unix\\mixed\\',

			'windows\\unix/mixed/': 'windows\\unix\\mixed\\'
		};

		for (let p in _map)
		{
			it(`${ p } => ${ _map[p] }`, function () {
				assert.equal(upath.normalize(p), _map[p]);
			});
		}
	});

	describe('path.join(paths...)', function ()
	{
		var _map = [
			[
				['some/nodejs/deep', '..\\path'],
				'some\\nodejs\\path',
			],
			[
				['some/nodejs\\windows', '..\\path'],
				'some\\nodejs\\path',
			],
			[
				['some\\windows\\only', '..\\path'],
				'some\\windows\\path',
			],
		];

		for (let i in _map)
		{
			it(`${ _map[i][0] } => ${ _map[i][1] }`, function () {
				assert.equal(upath.join.apply(upath, _map[i][0]), _map[i][1]);
			});
		}
	});

	describe('path.formatify(path)', function ()
	{
		var _map = [
			[
				['.//windows\//unix//mixed////'],
				'.\\windows\\unix\\mixed\\',
			],
			[
				['..///windows\\..\\unix/mixed'],
				'..\\windows\\..\\unix\\mixed',
			],
			[
				['..///\\\\\\\\\\\\\\\//////////////////windows\\\\\\\\\\\\\\\//////////////////\\..\\unix/mixed'],
				'..\\windows\\..\\unix\\mixed',
			],
		];

		for (let i in _map)
		{
			it(`${ _map[i][0] } => ${ _map[i][1] }`, function () {
				assert.equal(upath.formatify.apply(upath, _map[i][0]), _map[i][1]);
			});
		}
	});

	describe('path.isAbsolute(path)', function ()
	{
		var _map = [
			[
				['D:\\Users\\Documents\\The Project\\JetBrains\\untitled\\package.json'],
				true,
			],
			[
				['\\untitled\\package.json'],
				false,
			],
		];

		for (let i in _map)
		{
			it(`${ _map[i][0] } => ${ _map[i][1] }`, function () {
				assert.equal(upath.isAbsolute.apply(upath, _map[i][0]), _map[i][1]);
			});
		}
	});

	describe('path.septrim(path)', function ()
	{
		var _map = [
			[
				['./'],
				'.',
			],
			[
				['./../'],
				'..',
			],
			[
				['./../dep/'],
				'..\\dep',
			],
			[
				['path//dep\\'],
				'path\\dep',
			],
			[
				['.//windows\\unix/mixed/'],
				'.\\windows\\unix\\mixed',
			],
			[
				['./././././/windows/././././\\unix/././././mixed/'],
				'.\\windows\\unix\\mixed',
			],
			[
				['././././'],
				'.',
			],
			[
				['./././.././././.'],
				'..',
			],
			[
				['././.././dep/'],
				'..\\dep',
			],
			[
				['path//dep\\'],
				'path\\dep',
			],
		];

		for (let i in _map)
		{
			it(`${ _map[i][0] } => ${ _map[i][1] }`, function () {
				assert.equal(upath.septrim.apply(upath, _map[i][0]), _map[i][1]);
			});
		}
	});

});