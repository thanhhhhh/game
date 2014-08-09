var express = require('express');
var app = express();
var path = require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');
var test = require('./server_scripts/db.js')();

app.use(bodyParser.json());

app.get('/',function(req,res,next){
	res.sendfile('index.html');
})

app.post('/login',function(req,res){
	test.func1();
	if (req.body["newplayer"] == "Y"){
		add(req.body,res);
	} else {
		//login(req.body);
		login(req.body,res);
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

function add(obj,res){
	
	var sil = new UserModel({"login": obj.login,"password": obj.password});
	sil.save(function(err){
		if (err) {
			if(err.code == 11000){
				res.send({type:"register",msg: "Username already taken.  Pick another.",code: 4, sys: err});
			} else {
				res.send({type:"register",msg: "Registration failed.  Please try again.",code: 5, sys: err});
			}
			 
		} else {
			res.send({type:"register",msg: "sucess!",code: 3, sys:err});
		}
	});
	 
}

function login(obj,res){
	UserModel.find({"login": obj.login,"password": obj.password},{login:1,_id:0,password:1},function (err,users){
		if (users.length == 0){
			res.send({type:"login",msg: "fail!",code:1,sys:err,users:users});
		} else {
			res.send({type:"login",msg:"loginSuccess!",code:0,sys:err,users:users});
		}
	});
}
