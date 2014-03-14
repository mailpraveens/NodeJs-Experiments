var http = require('http'),
	fs = require('fs'),
	sanitize = require('validator');
	
var app = http.createServer(function (request, response) {
	// for any request, just serve the client.html. 
	// Alternatively once can parse the url in the request and decide what action needs to be taken
	fs.readFile("client.html", 'utf-8', function (error, data) {
		response.writeHead(200, {'Content-Type': 'text/html'});
		response.write(data);
		response.end();
	});
}).listen(8080);

var io = require('socket.io').listen(app);

io.sockets.on('connection', function(socket) { 
	// The event "message_to_server" is received and the callback is called
	socket.on('message_to_server', function(data) { 
		var escaped_message = sanitize.escape(data["message"]);
		//For all registered connections the event is broadcasted
		io.sockets.emit("message_to_client",{ message: data }); 
	});
});
