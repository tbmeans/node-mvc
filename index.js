const http = require('http');
const fs = require('node:fs');

const hostname = '0.0.0.0'; // all 0s to get out to LAN; orig. had '127.0.0.1';
const port = 8080;
const intraddr = `http://${hostname}:${port}/`;

const mimeTypes = {
	"mp4": "video/mp4",
	"png": "image/png",
	"txt": "text/plain", // for quick transfer of journals to laptop
	// more types of files for transfer from dev pc to personal pc
	"zip": "application/zip",
	"htm": "text/html; charset=UTF-8", 
	"html": "text/html; charset=UTF-8", // if ever want an index.html
	"js": "text/javascript", // user may download code
	"css": "text/css",
	"scss": "text/css",
	"jpg": "image/jpeg",
	"jpeg": "image/jpeg",
	"gif": "image/gif",
	"ico": "image/x-icon",
	"svg": "image/svg+xml",
	"gz": "application/gzip",
	"7z": "application/x-7z-compressed",
	"tar": "application/x-tar",
	"xz": "appilcation/x-xz",
	"xml": "application/xml",
	"pdf": "application/pdf",
	"sha256": "text/plain",
	"deb": "application/octet-stream",
	"sh": "text/plain",
};
const fileExtensions = Object.keys(mimeTypes);

/* Controllers */
const home = require('./homeController.js');
const vids = require('./videoController.js');

const VID_ROUTE = "Videos"
const QUERY_KEY = 'cat';
const INIT_QUERY_VAL = home.initCat;

const serv = http.createServer(function(req, res) {
	/* Request is either for an mp4 or png file through the video route,
	 * a video ID through the video route to go to page w/ embedded video,
	 * a query string through the home route, the home route with empty
	 * path after it, or the "Video" route with empty path after it. 
	 * Home and "Video" route followed by empty path will yield the 
	 * same response. 
	 */
	const reqUrl = new URL(req.url, intraddr);
	const reqPath = reqUrl.pathname;
  const dotIndex = reqPath.lastIndexOf('.');
  const reqFxt = dotIndex > 1 ? reqPath.slice(dotIndex + 1) : '';
	const videoId = reqUrl.pathname.includes(VID_ROUTE) &&
			reqUrl.pathname.split('/').at(-1)

	if (fileExtensions.includes(reqFxt)) {
		// Request is for a file.
		fs.readFile('.' + reqPath, function(error, content) {
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
	} else if (videoId && videoId !== VID_ROUTE) {
		// Neither exactly /Videos/ nor exactly /Videos
		// but had /Videos/<something>.
		res.statusCode = 200;
		res.setHeader('Content-Type', 'text/html');
		res.end(vids.controller(videoId));
	} else if (videoId === VID_ROUTE || reqPath === `/${VID_ROUTE}/` ||
				reqPath === '/' || reqUrl.search.length) {
		// Paths '/Videos', '/Videos/' and home/index get home page w/all videos.
		// Query string filters all videos.
		const queryValue = reqUrl.searchParams.get(QUERY_KEY) || INIT_QUERY_VAL;
		res.statusCode = 200;
		res.setHeader('Content-Type', 'text/html');
		res.end(home.controller(queryValue));
	} else {
		// Toss the bad route and go home.
		res.statusCode = 301;
		res.setHeader('Location', (new URL('/', intraddr)).href);
		res.end();
	}
});

serv.listen(port, hostname, () => {
	console.log(`Server running at ${intraddr}`);
});
