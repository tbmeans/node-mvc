const http = require('http');
const qstr = require('querystring');
const fs = require('node:fs');

const hostname = '127.0.0.1';
const port = 8080;

/* Controllers */
const home = require('./homeController.js');
const vids = require('./videoController.js');

const initItem = home.initCat;

const VIDEOROUTE = '/Videos/';

const serv = http.createServer((req, res) => {
	try {
		/* Request is either for an mp4 file through the video route,
		 * a query string through the home route, the home route with
		 * empty path after it, or the "Video" route with empty path
		 * after it. Home and "Video" route followed by empty path
		 * will yield the same response. */
		const reqIsForMP4 = req.url.includes('.mp4');
		const reqIsQuery = req.url[1] = '?';

//		res.statusCode = 200;
//		res.setHeader('Content-Type', 'text/html');

		if (reqIsForMP4) {
			// Remove route name "Videos" and slashes and ".mp4" ext
			//const id = req.url.slice(VIDEOROUTE.length, -4);
			//res.end(video.controller(id));
			fs.readFile();
		} else {
			// Home and video routes both display all video links.
			const qobj = reqIsQuery && qstr.parse(req.url) || initItem;
			const qkey = Object.keys(qobj)[0];
			res.statusCode = 200;
			res.setHeader('Content-Type', 'text/html');
			res.end(home.controller(qobj[qkey]));
		}
	} catch (e) {
		res.statusCode = 404;
		res.setHeader('Content-Type', 'text/plain');
		res.end('"' + req.url + '" ' + http.STATUS_CODES[404]);
	}
	return;
});

serv.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});

