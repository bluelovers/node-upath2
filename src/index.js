/**
 * Created by user on 2016/4/6.
 */
"use strict";

const path = require("path");

const upath = Object.assign({}, path, {
	sep: '/',

	regexp: {
		win32: /\\|\\\\/g,
	},

	toUnix: function (p)
	{
		var r = this.regexp.win32;
		p = p.replace(r, this.sep);
		while (p.match(r))
		{
			p = p.replace(r, this.sep);
		}
		return p;
	},

	toUnixMap: function (p)
	{
		if (typeof p === 'string')
		{
			return this.toUnix(p);
		}
		else if (typeof p === 'object' || Array.isArray(p))
		{
			for (let i in p)
			{
				p[i] = this.toUnixMap(p[i]);
			}
		}
		return p;
	}
});

for (let name in path)
{
	if (typeof path[name] === 'function')
	{
		upath[name] = function ()
		{
			var _self = this;
			var args = arguments.length ? Array.prototype.slice.call(arguments, 0) : [];

			return _self.toUnixMap(path[name].apply(path, args));
		};
	}
}

upath.upath = upath;

exports = module.exports = upath;
