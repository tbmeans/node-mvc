const db = require('./tvrecs.js');

const defaultPick = db.list.find(rec => rec.whenrec.includes("2015070801"));

exports.query = function(value) {
	if (value == undefined) {
		return [];
	}

	const valueIsId = value.length === 10 &&
			value.split('').every(x => '0123456789'.indexOf(x) >= 0);
	
	if (valueIsId) {
		const rec = db.list.find(o => o.whenrec === value);
		return rec || defaultPick;
	}

	if (value.match(/^all/i)) {
		return db.list;
	}

	return db.list.filter(rec => rec.tags.includes(value));
};

exports.list = db.list;
