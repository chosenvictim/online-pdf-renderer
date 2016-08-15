var express = require("express");
var server = new express();

server.use(express.static('.'));

server.listen(3010, function(err) {
	if(err) {
		console.log("Error running server");
	}
	console.log("Server is running. Open http://localhost:3010");
})