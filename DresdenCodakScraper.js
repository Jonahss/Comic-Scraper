var request = require('request'),
	cheerio = require('cheerio'),
	fs		= require('fs');


save_comic = function(url){
	request.get(url, function(error, response, body){
		if (!error && response.statusCode == 200){
			$ = cheerio.load(body);
			var comic_src = $('#comic a img').attr('src');
			var next_url = $('#comic a').attr('href');
			var name = comic_src.split('/').pop();
			
			request(comic_src).pipe(fs.createWriteStream('DresdenCodak/'+name));
			
			console.log(name);
			if (url != next_url){
				save_comic(next_url);
			}
		}
	});
}

var url = 'http://dresdencodak.com/2005/06/08/the-tomorrow-man/';

save_comic(url);

