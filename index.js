global.log = console.log;

var router = { 'get':{}, 'post':{}};

require('./controllers/home.js').init(router);
require('./controllers/posts.js').init(router);
require('./controllers/static.js').init(router);

require('./http-server.js').init(router);