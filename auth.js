var express = require('express');
var app = express();
var path = require('path');
var http = require('http').Server(app);
var bodyParser = require('body-parser');

app.use(bodyParser.json());

app.get('/',function(req,res,next){
	res.sendfile('index.html');
})

app.post('/login',function(req,res){
	console.log(req.body);
	add(req.body);
	res.send(req.body);
});
 
app.use(express.static(path.join(__dirname, 'public')));


http.listen(3000,function(){
console.log('lsitening to 3000');
});

// MONGOOSE

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;

var user = mongoose.Schema({
	id: String,
	name: String
});

function add(obj){
	var User = mongoose.model('User',user);

	var sil = new User({"name": obj.name,"id": obj.id});
	sil.save(function(err){
		if (err) {
			console.log("Error saveing");
		} else {
			console.log("no error in saving");
			User.find(function (err,users){
				console.log(users);
			});
		}
	});
}