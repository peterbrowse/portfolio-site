//Variables
var googleDoc = 'https://docs.google.com/spreadsheet/pub?key=0Ai9ckkshmG5IdHpWem41Ujl2djJfaVNvaFRhcnRJb2c&output=html';

//Dependencies
var express		= require('express')
,	http 		= require('http')
,	app 		= express()
,	server 		= http.createServer(app)
,	jade		= require('jade')
,	sass		= require('node-sass')
,	tabletop	= require('tabletop')
,	fs			= require('fs');

//Express Environment Configuration
app.configure('development', function(){
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(sass.middleware({
		src: __dirname + '/sass',
		dest: __dirname + '/public',
		debug: true,
		outputStyle: 'compressed'
	}));
	app.use(express.static(__dirname + '/public'));
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
	app.use(express.logger());
});

app.configure('production', function(){
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(sass.middleware({
		src: __dirname + '/sass',
		dest: __dirname + '/public',
		debug: true,
		outputStyle: 'compressed'
	}));
	app.use(express.static(__dirname + '/public'));
	app.use(express.errorHandler());
});

//Server Listen Declaration
server.listen(process.env.PORT || 8080, function (err) {
	if (err) {
  		console.log('errr: '+err);
  	} else {
  		console.log('info: Express server started on %s: %s', server.address().address, server.address().port);
  		console.log('info: App running in '+process.env.NODE_ENV+ ' mode.');
  		getContent(function(data, tabletop) {
	  		//console.log(JSON.stringify(tabletop,null,4));
  		});
  	}
});

//RESTful routes
app.get('/', function(req, res){
  res.render('index', {
    title: 'Peter Browse'
  });
});

//Content Requesting Function
function getContent(callback) {
	tabletop.init({
		key: googleDoc,
		callback: function(data, tabletop) {
			callback(data, tabletop);
		}
	});
}
