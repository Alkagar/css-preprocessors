
exports.form = function(req, res){
    res.render('form', {title: 'Stylus parser'});
};

exports.getParsed = function(req, res){
    var exec = require('child_process').exec;
    var fs = require('fs');

    fs.writeFileSync('tempStyle.styl', req.body.stylusCode);

    exec('stylus < tempStyle.styl > tempStyle.css', function () {});

    var filePath = 'tempStyle.css';

    var content = fs.readFileSync(filePath, {encoding: 'utf-8'});
    res.json({stylus : content});
};
