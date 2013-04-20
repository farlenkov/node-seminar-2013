
exports.init = function(router){

    router.get['/'] = function (req, res) {
        
        res.write('home');
        res.end();
    };
}