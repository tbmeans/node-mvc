const db = require('./tvrecs.js');

exports.query = function(keyword) {
	if (keyword == undefined) {
		return [];
	}
	if (keyword.match(/^all/i)) {
		return db.list;
	}
	return db.list.filter(rec => rec.tags.includes(keyword));
};
