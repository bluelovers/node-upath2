/**
 * base on upath
 * 
 * upath http://github.com/anodynos/upath/
 *
 * @doc https://nodejs.org/api/path.html
 */
"use strict";

const path = require("path");

const SEP_WIN32 = '\\';
const SEP_UNIX = '/';

const upath = Object.assign({}, path,  {
	sep: '/',

	_regexp: {
		win32: /\\|\\\\/g,

		all: /[\/\\]+/g,

		//rtrim: /(?:\\|\\\\|\/|\/\/|[\/\\]\.)+$/g,
		//ltrim: /^(?:[\/\\]\.[\/\\]|\.[\/\\](\.))/g,
		//mtrim: /^(.+)(?:[\/\\]+\.[\/\\]+)+(.+)/g,

		double: /[\/\\]{2,}/g
	},

	formatify: function (p)
	{
		var r = this.upath._regexp.all;
		p = p.replace(r, this.sep);
		/*
		var d = this.upath._regexp.double;
		while (p.match(d))
		{
			p = p.replace(d, this.sep);
		}
		*/
		return p;
	},

	formatifyMap: function (p)
	{
		if (typeof p === 'string')
		{
			return this.upath.formatify.call(this, p);
		}
		else if (typeof p === 'object' || Array.isArray(p))
		{
			for (let i in p)
			{
				p[i] = this.upath.formatifyMap.call(this, p[i]);
			}
		}
		return p;
	},

	septrim(p)
	{
		var a = new Array();

		p
			.replace(this.upath._regexp.all, this.sep)
			.split(this.upath._regexp.all)
			.forEach(function(element, index, array)
			{
				if (element && !(index > 0 && element == '.'))
				{
					a.push(element);
				}
			});

		if (a[0] == '.' && a[1] == '..') a.shift();

		p = a.join(this.sep);

		return p
			//.replace(this._regexp.rtrim, '')
			//.replace(this._regexp.mtrim, '$1$2')
			//.replace(this._regexp.ltrim, '$1')
			//.replace(this._regexp.double, this.sep)
			//.replace(this._regexp.all, this.sep)
			;
	}
});

upath.SEP_WIN32 = SEP_WIN32;
upath.SEP_UNIX = SEP_UNIX;

upath.upath = upath;

upath.win32 = Object.assign({}, path.win32);
upath.posix = Object.assign({}, path.posix);

{
	let hander = function (old, old_fn)
	{
		return function ()
		{
			var _self = this;
			var args = arguments.length ? Array.prototype.slice.call(arguments, 0) : [];

			return this.upath.formatifyMap.call(this, old_fn.apply(old, args));
		};
	};

	let hander2 = function (old, old_fn)
	{
		return function ()
		{
			var _self = this;
			var args = arguments.length ? Array.prototype.slice.call(arguments, 0) : [];

			return this.upath.formatifyMap.call(this, old_fn.apply(old, this.upath.formatifyMap.call(this, args)));
		};
	};

	let a = ['win32', 'posix'];

	for (let i in a)
	{
		let k = a[i];
		
		if (k == 'posix')
		{
			hander = hander2;
		}

		for (let name in path[k])
		{
			if (typeof path[k][name] === 'function')
			{
				upath[k][name] = hander(path[k], path[k][name]);
			}
			else
			{
				//upath[k][name] = path[k][name];
			}
		}
	}

	for (let name in path)
	{
		if (typeof path[name] === 'function')
		{
			upath[name] = hander(path, path[name]);
		}
		else
		{
			//upath[name] = path[name];
		}
	}
}

['upath', 'formatify', 'formatifyMap', 'septrim', 'win32', 'posix', 'SEP_WIN32', 'SEP_UNIX'].forEach(function (name, index, array)
{
	upath.win32[name] = upath.posix[name] = upath[name];
});

exports = module.exports = upath;

console.log(upath);
