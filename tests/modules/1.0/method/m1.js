var __m1__ = __m1__ || {hasOwnProperty: null, toString: null};
var module = module || {};
function require(path)
{
	var relativePath;
	var currentPath;
	if(path.charAt(0) == ".")
	{
		currentPath = __m1__.currentPath;
		if(path.charAt(1) != ".")
		{
			path = currentPath ?
				currentPath + path.substring(1) :
				path.substring(2);
			currentPath = path.split("/");
		}
		else
		{
			currentPath = currentPath ?
				currentPath.split("/") :
				[];
			relativePath = path.split("/");
			for(var i=0; relativePath[i] == ".."; ++i)
				currentPath.pop();
			path = currentPath.concat(relativePath.splice(i));
			currentPath = path.concat();
			path = path.join("/");
		}
	}
	else
	{
		currentPath = path.split("/");
	}
	currentPath.pop();
	currentPath = currentPath.join("/");
	var module = __m1__[path];
	if(!module)
	{
		var request = new XMLHttpRequest;
		request.open("GET", path + ".js", false);
		request.send();
		if(request.status == 200)
		{
			module = {
				content: function(require, module) {
					var exports = module.exports = {};
					eval(request.responseText);
					module.exports = exports;
				}
			};
		}
		else
		{
			throw "not found: " + path;
		}
	}
	__m1__[path] = module;
	if(!module.exports)
	{
		__m1__.currentPath = currentPath;
		module.content.call(null, require, module);
	}
	return module.exports;
}
function shim(path, module)
{
	__m1__[path] = {
		exports: module
	};
}