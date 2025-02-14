const http = require('http');
const qstr = require('querystring');
const fs = require('node:fs');

const hostname = '127.0.0.1';
const port = 8080;

const mimeTypes = {
	"mp4": "video/mp4",
	"png": "image/png"
};
const fileExtensions = Object.keys(mimeTypes);

/* Controllers */
const home = require('./homeController.js');
const vids = require('./videoController.js');

const VID = "/Videos/"

const initItem = home.initCat;

const serv = http.createServer(function(req, res) {
	/* Request is either for an mp4 or png file through the video route,
	 * a video ID through the video route to go to page w/ embedded video,
	 * a query string through the home route, the home route with empty
	 * path after it, or the "Video" route with empty path after it. 
	 * Home and "Video" route followed by empty path will yield the 
	 * same response. 
	 */
  const dotIndex = req.url.lastIndexOf('.');
  const reqFxt = req.url.slice(dotIndex + 1).replaceAll('/', '');
  const isQueryStr = req.url.includes('?');

	if (fileExtensions.includes(reqFxt)) {
		// Request is for a file.
		fs.readFile('.' + req.url, function(error, content) {
			if (error) {
				if (error.code === 'ENOENT') {
					res.writeHead(404);
					res.end('404 Not Found');
				} else {
					res.writeHead(500);
					res.end('500 Internal Server Error');
				}
			} else {
				res.writeHead(200, { 'Content-Type': mimeTypes[reqFxt] });
				res.end(content, 'utf-8');
			}
		});
	} else if (req.url.includes(VID) && req.url.length > VID.length &&
        isQueryStr === false) {
		/* request contains a video id */
		const id = req.url.replace(VID, '').replaceAll('/', '');
		res.statusCode = 200;
		res.setHeader('Content-Type', 'text/html');
		res.end(vids.controller(id));
	} else if (req.url === '/' || req.url === VID || isQueryStr) {
		// Request has no video ID but possibly a query string.
		// Home and Videos routes both display all video links.
		const qobj = isQueryStr && qstr.parse(req.url) || initItem;
		const qkey = Object.keys(qobj)[0];
		res.statusCode = 200;
		res.setHeader('Content-Type', 'text/html');
		res.end(home.controller(qobj[qkey]));
	} else {
		res.statusCode = 404;
		res.setHeader('Content-Type', 'text/plain');
		res.end('"' + req.url + '" ' + http.STATUS_CODES[404]);
	}
});

serv.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});
