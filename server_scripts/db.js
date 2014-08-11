module.exports = function(){

	// MONGOOSE
	var mongoose = require('mongoose');
	mongoose.connect('mongodb://localhost/test');
	var db = mongoose.connection;

	//Define Schemas
	var user = mongoose.Schema({
		login: String,
		password: String
	});

	var newGame = mongoose.Schema({
		game_id: String,
		scramble: String,
		answer: String,
		leader: String,
		players: Array,
		game_status: String
	});

	var joinGame = mongoose.Schema({
		game_id: String,
		player: String
	});

	var newGameModel = mongoose.model('scrambler_games',newGame);

	var joinGameModel = mongoose.model('scrambler_playing',joinGame);

	var UserModel = mongoose.model('users',user);

	return {
		add: function(obj,res){
	
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
	 
		},
		login: function login(obj,res){
			UserModel.find({"login": obj.login,"password": obj.password},{login:1,_id:0,password:1},function (err,users){
				if (users.length == 0){
					res.send({type:"login",msg: "fail!",code:1,sys:err,users:users});
				} else {
					res.send(
						{
							type:"login",
							msg:"loginSuccess!",
							code:0,
							sys:err,
							users:users
						})
					;
				}
			});
		},
		createGame: function(obj,res){
			var newGame = newGameModel({
				game_id: obj.game_id,
				scramble: obj.text,
				answer: obj.answer,
				leader: "",
				players: [],
				game_status: obj.game_status
			});
			newGame.save(function(err){
				//do stuff and make emmiter
			});

		},
		joinGame: function(obj,res){
			var joinGame = newGameModel();
			joinGame.findByIdAndUpdate(obj.game_id,{$push: {players: obj.player}},function(err,model){
				console.log(err);
			});

		}
	};
}