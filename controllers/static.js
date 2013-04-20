var fs = require('fs');

exports.init = function(router) {

    router.get['/script.js'] = function (req, res) {
        
        fs.readFile(
            './static/script.js',
        	'utf8',
        	function(err, data){

				res.writeHead(200, {'Content-Type': 'application/javascript'});
				res.write(data);
        		res.end();
        	});
    };
};