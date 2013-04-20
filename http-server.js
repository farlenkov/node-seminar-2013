var http = require('http');
var parser = require('url');
var qs = require('querystring');

exports.init = function (router) {
  
    var process_request = function (request, responce) {
    
        var request_handler;
        var request_url = parser.parse(request.url);
        request.query = qs.parse(request_url.query);
    	
    	if(request.method === 'GET')
            request_handler = router.get[request_url.pathname];
        else
            request_handler = router.post[request_url.pathname];

    	if(request_handler) {
            
            request_handler(request, responce);
    	}
        else {
                
            responce.write('404 not found');
            responce.end();
        }
    };

    var server = http.createServer(process_request);
    server.listen(process.env.PORT, process.env.IP);
};


