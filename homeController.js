const model = require('./tvrecModel.js');
const view = require('./homeView.js');

exports.controller = function(input) {
    return view.render(model.query(input));
}

exports.initCat = view.initCat;