const fs = require('fs');
const mime = require('mime-types');



var websiteBase = "website";
exports.fetchFile = function (request, response) {
	request.url = websiteBase+request.url;
	fs.stat(request.url, function(err, stat) {
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
			response.writeHead(200, {
				'Content-Type': mime.lookup(request.url),
				'Content-Length': stat.size
			});

			var readStream = fs.createReadStream(request.url);
			readStream.pipe(response);
		} else {
			console.log('Some other error: ', err.code);
		}
	});

};
