
exports.form = function(req, res){
    var template = '$font-stack:    Helvetica, sans-serif;' + "\n" +
   '$primary-color: #333;' + "\n" +
   'body {' + "\n" +
   '  font: 100% $font-stack;' + "\n" +
   '    color: $primary-color;' + "\n" +
   '    }';
    res.render('form', {title: 'Sass parser', href:'/sass', tpl : template});
};

exports.getParsed = function(req, res){
    var exec = require('child_process').exec;
    var fs = require('fs');

    fs.writeFileSync('tempSass.scss', req.body.stylusCode);

    exec('sass tempSass.scss tempSass.css', function (error, b, c) {
        if(error !== null) {
            fs.writeFileSync('tempSass.css', error);
        }

        var filePath = 'tempSass.css';

        var content = fs.readFileSync(filePath, {encoding: 'utf-8'});
        res.json({stylus : content});
    });
};
