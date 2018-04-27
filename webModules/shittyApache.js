const fs = require('fs');
const ss = require('stream-stream');
const mime = require('mime-types');
const websiteBase = "website";

exports.fetchFile = function (request, response) {
	//prep the url with the directory on the server
	request.url = websiteBase+request.url;
	fs.stat(request.url, function(err, stat) {
		//check for errors and return the error page if any errors exist. This is you custom 404 page
		if(mime.lookup(request.url) == false ||err != null && err.code == 'ENOENT')
		{
			var stat = fs.statSync(websiteBase+"/error.html");
			response.writeHead(404, {
				'Content-Type': mime.lookup(websiteBase+"/error.html"),
				'Content-Length': stat.size
			});
			var readStream = fs.createReadStream(websiteBase+"/error.html");
			readStream.pipe(response);
		}else if(err == null) {
			//This is where the magic happens. We are loading the fill template if it a first time visit to the page
			//This should allow a crawler to do its thing
			var files = [];
			var type = mime.lookup(request.url);
			console.log("type is: ",type);
			if(request.headers["referer"] == undefined && type == 'text/html')
			{
				var files = ['header.html', request.url,'footer.html'];
				var stream = ss();

				files.forEach(function(f) {
					stream.write(fs.createReadStream(f));
				});
				stream.end();
				response.writeHead(200, {'Content-Type' : 'text/html'});
				stream.pipe(response);
				return;
			}else
			{
				response.writeHead(200, {
					'Content-Type': mime.lookup(request.url),
					'Content-Length': stat.size
				});
				console.log(request.url);
				var readStream = fs.createReadStream(request.url);
				readStream.pipe(response);
			}
		} else {
			console.log('Some other error: ', err.code);
		}
	});

};
