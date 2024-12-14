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
			console.log("'request is for mp4' condition met")
			// Remove route name "Videos" and slashes and ".mp4" ext
			//const id = req.url.slice(VIDEOROUTE.length, -4);
			//res.end(video.controller(id));
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
					res.writeHead(200, { 'Content-Type': 'video/mp4' });
					res.end(content, 'utf-8');
				}
				// since a request like /Video/2005080701.mp4 is a file path not a true route,
				// the only thing you can do is make a video/mp4 content response with fs API,
				// and if it's video/mp4, it can't be 'text/html', and therefore I can't fool 
				// Node into serving dom renderings like i did for my true route responses, and
				// the browser takes over control of wrapping the file content in DOM.
				// there's such a thing as multipart/mixed but there's no good documentation i can
				// find on using that in Node, other than some AI garble. So just on my own brain
				// pickings, if want embedded video page, the route must not be to a file, instead
				// the home and card views must link with true routes such as /Video/2005080701 or
				// /Video/king-of-kings, and that has a text/html response in a conditional in addition
				// to this fs conditional. keep fs conditional so that the embed links to a file still
				// work, or at least that's my theory of how embed elements, <video> can be made to work.
			});
		} else {
			// Home and video routes both display all video links.
			const qobj = reqIsQuery && qstr.parse(req.url) || initItem;
			const qkey = Object.keys(qobj)[0];
			res.statusCode = 200;
			res.setHeader('Content-Type', 'text/html');
			res.end(home.controller(qobj[qkey]));
		}
	} catch (e) {
		console.log('we are in request-response error handling')
		res.statusCode = 404;
		res.setHeader('Content-Type', 'text/plain');
		res.end('"' + req.url + '" ' + http.STATUS_CODES[404]);
	}
	return;
});

serv.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});

