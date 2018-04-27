const fs = require('fs');
var ss = require('stream-stream');
const mime = require('mime-types');



var websiteBase = "website";
exports.fetchFile = function (request, response) {
	request.url = websiteBase+request.url;
	console.log(request.url);
	if(request.headers["referer"] == undefined)
	{
		console.log("prepend header, and append footer");
	}
	//console.log(request.headers);
	fs.stat(request.url, function(err, stat) {
		//console.log("known mimetype",mime.lookup(request.url) == false);
		//console.log(err);
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
			var files = [];
			var type = mime.lookup(request.url);
			console.log
			if(request.headers["referer"] == undefined)
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
				console.log("ajax load");
				response.writeHead(200, {
					'Content-Type': mime.lookup(request.url),
					'Content-Length': stat.size
				});
				console.log(request.url);
				var readStream = fs.createReadStream(request.url);
				readStream.pipe(response);
			}



			/*var stream = ss();

			files.forEach(function(f) {
				stream.write(fs.createReadStream(f));
			});
			stream.end();

			console.log(request.url);
			var readStream = fs.createReadStream(request.url);
			readStream.pipe(response);*/
		} else {
			console.log('Some other error: ', err.code);
		}
	});

};
