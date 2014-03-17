
exports.form = function(req, res){
    var template = '.error ' + "\n" +
                   '    width:500px' + "\n" +
                   '.super-error' + "\n" +
                   '    color:red' + "\n" +
                   '    @extend .error ';
    res.render('form', {title: 'Stylus parser', href:'/', tpl : template});
};

exports.getParsed = function(req, res){
    var exec = require('child_process').exec;
    var fs = require('fs');

    fs.writeFileSync('tempStyle.styl', req.body.stylusCode);

    exec('stylus < tempStyle.styl > tempStyle.css', function (error) {
        if(error !== null) {
            fs.writeFileSync('tempStyle.css', error);
        }
        var filePath = 'tempStyle.css';

        var content = fs.readFileSync(filePath, {encoding: 'utf-8'});
        res.json({stylus : content});
    });

};
