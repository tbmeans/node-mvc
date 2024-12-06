const title = 'Media server on the home network';

const message = 'TV recordings';

const cats = require('./catsView.js');

exports.initCat = { cat: cats.list[0] };

exports.render = function(data) {
	const doc = [
		'<!DOCTYPE html> <html lang="en"> <head> ',
		'<meta charset="utf-8" /> ',
		'<meta name="viewport" content="width=device-width, ',
		'initial-scale=1" /> '
	].join('');
	
	const sty = [
		'<style> body{ font-family: Verdana, Arial, Helvetica, ',
		'sans-serif; } h1{ color: white; } video{ width: 1920px; } ',
		'.hero { background-color: slateblue; text-align: center; ',
		'height: 12rem; padding-top: 4rem; } ',
		'#nav-list{ list-style-type: none; padding-top: 5rem; ',
		'text-align: left; padding-left: 2rem; } .nav-item{ ',
		'display: inline-block; padding-right: 2rem; } ',
		'.nav-item > a{ color: white; text-decoration: none; } ',
		'.form-box{ margin-top: 1rem; margin-left: 1rem; } ',
		'.card-container{ display: flex; flex-direction: column; ',
		'margin: 2rem 4rem; } ',
		'.card{ text-align: center; margin-top: 1rem; } ',
		'@media (min-width: 768px){ .card-container{ ',
		'flex-direction: row; flex-wrap: wrap; } ',
		'.card{ width: 400px; } } </style> </head> '
	].join('');
	
	const stock = (doc + '<title>' + title + '</title>' +
			sty + '<body> <div class="hero"> <h1>' +
					message + '</h1> </div> ');
					
	const close = '</body> </html>';
	
	const ankr = (linkdat) => {
		const open = '<a href="Videos/' + linkdat.whenrec + '.mp4">';
		const aimg = ('<img src="img/' + linkdat.whenrec + '.png" ' +
				'alt="' + linkdat.title + '">'); 
		const ahed = '<h3>' + linkdat.title + '</h3>'; 
		return open + aimg + ahed + '</a>';
	};
	
	const fmope = [
		'<div class="form-box">',
		'<form action="" method="GET">',
		'<label for="cat-sel">Pick a category</label>',
		'<select name="cat" id="cat-sel">'
	].join(' ');
	
	const capt = (str) => str[0].toUpperCase() + str.slice(1);
	
	const fmclo = [
		'</select>',
		'<button>Show all in category</button>',
		'</form>',
		'</div>'
	].join(' ');
	
	const menu = fmope + cats.list.map(word => {
		return [
			'<option value="',
			word,
			'">',
			capt(word),
			'</option>'
		].join('');
	}).join('') + fmclo;
			
	const card = (link) => '<div class="card">' + link + '</div>';
	
	const bodat = ('<div class="card-container">' +
			data.map(rec => rec && card(ankr(rec))).join('') +
					'</div>');
	
	return stock + menu + bodat + close;
};

