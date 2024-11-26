const http = require('http');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 8080;

const serv = http.createServer((req, res) => {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/html');
	res.end('<h1>Hello world!</h1>');
	return;
});

serv.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});

