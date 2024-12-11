exports.render = function(id, title, isCc) {
	const doc = [
		'<!DOCTYPE html> <html lang="en"> <head> ',
		'<meta charset="utf-8" /> ',
		'<meta name="viewport" content="width=device-width, ',
		'initial-scale=1" /> ',
        '<title>' + title + '</title> '
	].join('');
	
	const sty = [
		'<style> ',
        'body{ background: black; text-align: center; } ',
        'video{ position: relative; top: 25%; } ',
        '</style> </head> '
	].join('');

    const track = '<track default kind="captions" src="Videos/' + id +
            '.vtt"> ';
	
	const bod = [
        '<body> ',
        '<video controls autoplay name="media"> ',
        '<source src="Videos/' + id + '.mp4" type="video/mp4"> ',
        isCc > 0 && track || '',
        '</video> ',
        '</body> '
    ].join('');
	
	return doc + sty + bod + '</html>';
};

