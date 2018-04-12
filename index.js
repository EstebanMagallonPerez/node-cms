const http = require('http');
const port = 8080;
var apache = require('./webModules/shittyApache');

const requestHandler = (request, response) => {
	if (request.url == "/")
	{
		request.url = "/index.html";
	}
	var result = apache.fetchFile(request, response);
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {
	if (err) {
		return console.log('something bad happened', err)
	}
	console.log(`server is listening on ${port}`)
})
