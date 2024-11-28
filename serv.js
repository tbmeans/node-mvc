const http = require('http');
const qstr = require('querystring');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 8080;

/* Controllers */
const home = require('./homeController.js');

const initItem = home.controller.view.initCat;

const serv = http.createServer((req, res) => {
	try {
		const qobj = (req.url === '/') && initItem || 
				qstr.parse(req.url);
		const qkey = Object.keys(qobj)[0];
		const qdat = qobj[qkey];
		const list = home.controller.model.query(qdat);
		res.statusCode = 200;
		res.setHeader('Content-Type', 'text/html');
		res.end(home.controller.view.render(list));
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

