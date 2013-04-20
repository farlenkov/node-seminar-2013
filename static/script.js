$(function  (argument) {
    
	var load_new_post = function() {

		$.getJSON('/get-new?' + (new Date()).getTime(), function(post){

			$('body').prepend(
				'<div><h1><a href="/post?id='+post.id+
				'">'+post.title+'</a></h1><div>'+post.body+
				'</div></div>');

			load_new_post();
		});
	}

	load_new_post();
});