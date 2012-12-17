var http = require("http");
var path = require("path");
var fs = require("fs");

var rootPath = process.argv[2];
rootPath = rootPath ? rootPath : "";

http.createServer(function (request, response) {
	var url = path.normalize(request.url);
	if(url == path.sep)
	{
		response.writeHead(200, {"Content-Type": "text/html"});
		response.end(fs.readFileSync("test.html", "utf8"));
		console.log(200, "TEST PAGE");
	}
	else if(url == (path.sep + "m1.js"))
	{
		response.writeHead(200, {"Content-Type": "text/javascript"});
		response.end(fs.readFileSync("m1.js", "utf8"));
		console.log(200, "m1.js");
	}
	else
	{
		var filePath = path.normalize(rootPath + path.sep + url);
		var file;
		try
		{
			file = fs.readFileSync(filePath, "utf8");
			response.writeHead(200, {"Content-Type": "text/javascript"});
			response.end(file);
			console.log(200, filePath);
		}
		catch(e)
		{
			response.writeHead(404);
			response.end("File not found");
			console.log(404, filePath);
		}
	}
}).listen(8000, "127.0.0.1");
console.log("Test server is running at http://127.0.0.1:8000");