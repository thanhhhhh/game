var express = require('express');
var app = express();
var path = require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');

app.use(bodyParser.json());

app.get('/',function(req,res,next){
	res.sendfile('index.html');
})

app.post('/login',function(req,res){
	if (req.body["newplayer"] == "Y"){
		add(req.body);
	} else {
		login(req.body);
	}
	 
});
 
app.use(express.static(path.join(__dirname, 'public')));

http.listen(3000,function(){
	console.log('lsitening to 3000');
});

// MONGOOSE
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;

//Define Schemas
var user = mongoose.Schema({
	login: String,
	password: String
});
var UserModel = mongoose.model('users',user);

function add(obj){
	
	var sil = new UserModel({"login": obj.login,"password": obj.password});
	sil.save(function(err){
		if (err) {
			io.emit(
				'loginMsg',
				{
					type :"add",
					msg  :"Error occured in registration, try again.",
					servermsg : err
				}
			);
		} else {
			io.emit(
				'loginMsg',
				{
					type :"add",
					msg  :"Registration Successful!",
					servermsg : err
				}
			);
		}
	});
	 
}

function login(obj){

	UserModel.find({"login": obj.login,"password": obj.password},function (err,users){
		if (users.length == 0){
			io.emit(
				'loginMsg',
				{
					type :"login",
					msg  :"You do not exist, register!"
				}
			);
		} else {
			io.emit(
				'loginMsg',
				{
					type :"login",
					msg  :"Login successful!"
				}
			);
		}
	});
}