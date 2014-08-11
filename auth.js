var express = require('express');
var app = express();
var path = require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');
var db = require('./server_scripts/db.js')();

app.use(bodyParser.json());

app.get('/',function(req,res,next){
	res.sendfile('index.html');
})


//User login or register req
app.post('/login',function(req,res){
	if (req.body["newplayer"] == "Y"){
		db.add(req.body,res);
	} else {
		//login(req.body);
		db.login(req.body,res);
	} 
});
 
app.post('/newgame',function(req,res){
	db.createGame(req.body,res);
});
app.post('/joingame',function(req,res){
	db.joinGame(req.body,res);
});

app.use(express.static(path.join(__dirname, 'public')));

http.listen(3000,function(){
	console.log('lsitening to 3000');
});


