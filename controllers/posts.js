var post_list = [

    {
        id : 1,
        title : 'post1',
        body : 'body of post 1'
    },
    
    {
        id : 2,
        title : 'post2',
        body : 'body of post 2'
    },
    
    {
        id : 3,
        title : 'post3',
        body : 'body of post 3'
    }
];

var request_list = [];

var render_head = function(res) {

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>');
    res.write('<script src="/script.js" type="text/javascript"></script>');
};

exports.init = function(router){

    router.get['/posts'] = function (req, res) {
        
        render_head(res);

        for (var i = post_list.length-1; i >= 0; i--) {
            
            var post = post_list[i];
            
            res.write('<div><h1><a href="/post?id=' + post.id
            + '">' + post.title +
            '</a></h1><div>'+post.body+'</div></div>');
        }
            
        res.end();
    };
    
    router.get['/post'] = function (req, res) {
        
        //render_head(res);
        var current_post;
        
        for (var i = 0; i < post_list.length; i++) {
            
            var post = post_list[i];
            
            if(post.id == req.query.id) {
                
                current_post = post;
                break;
            }
        }

        if(!current_post) {

            res.write('post not found');
            res.end();
            return;
        }
        
        res.write('<div><h1>'+current_post.title+
            '</h1><div>'+current_post.body+'</div></div>');
                    
        res.end();
    };
    
    router.get['/new'] = function (req, res) {
        
        //render_head(res);
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write('<form action="/create" method="get">');
        res.write('<label>Title:<input name="title"/></label><br>');
        res.write('<label>Body:<input name="body"/></label><br>');
        res.write('<input type="submit">');
        res.write('</form>');
                   
        res.end();
    };

    router.get['/create'] = function (req, res) {

        console.log(req.query);

        var post = {
            
            id : (new Date()).getTime(),
            title : req.query.title,
            body : req.query.body
        };

        post_list.push(post);
        res.writeHead(302, {'Location': '/post?id=' + post.id});
        res.end();

        var requests = request_list;
        request_list = [];

        while(requests.length > 0) {

            var res1 = requests.shift();
            res1.writeHead(200, {'Content-Type': 'application/json'});
            res1.write(JSON.stringify(post));
            res1.end();

            console.log({'responce closed':requests.length});
        }
        
        //console.log({'all responces closed':request_list.length});
    };

    router.get['/get-new'] = function (req, res) {

        request_list.push(res);
    };
};