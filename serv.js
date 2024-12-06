const http = require('http');
const qstr = require('querystring');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 8080;

/* Controllers */
const home = require('./homeController.js');

const initItem = home.initCat;

const serv = http.createServer((req, res) => {
	try {
		const reqIsForHome = req.url === '/';
		const qobj = reqIsForHome && initItem || qstr.parse(req.url);
		const qkey = Object.keys(qobj)[0];
		res.statusCode = 200;
		res.setHeader('Content-Type', 'text/html');
		res.end(home.controller(qobj[qkey]));
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

