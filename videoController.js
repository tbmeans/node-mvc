const model = require('./tvrecModel.js');
const view = require('./videoView.js');

const props = Object.keys(model.list[0]);

exports.controller = function(id) {
    const rec = model.query(id);
    return view.render(rec[props[0]], rec[props[1]], rec[props[2]]);
};