/*var app = require('express')();
var http = require('http').createServer(app);*/

var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var chatTO = {userName:"", DN:""};
const port = process.env.PORT || 3000;

var users = [];

var availableUsers = [];  
  
app.get('/', function(req, res){
  res.send('<h1>listening on *:3000</h1>');
});

http.listen(port, function(){
  console.log('listening on *:3000');
});

io.on('connection', function (socket) {
  console.log('client connected!');
  console.log(users);

   socket.on('addAsAvaiableUsers', function(data) {
			
			var key = data;
			var obj = {};
			obj[key] = data;
			console.log(obj);
			users.push(obj);
			//availableUsers.push(obj);
			console.log(users);	
			
			//users[data] = {userName:data};
			//console.log(socket.id);
			//var key = data;
			//users[key] = {userName: data};
			
			io.sockets.emit('userList', users);	   	
   });    
   
   socket.on('chatTo', function (data) {
     console.log(data.chatTo);
	 chatTO.userName = data.chatTo;
	 //, DN:""};
	 io.sockets.emit('chatToPageLoad', chatTO);	   
   });   
   
	socket.on('sendingMsg', function (data) {
		console.log("--------------");
		console.log(data);
		console.log(users);
		//console.log(users[0]);
		targetTo = data.to;
		//console.log(Object.keys(users));
		//console.log(Object.keys(users[targetTo]));
		//console.log(Object.keys(users[targetTo].userName));
		//name = users[targetTo].userName;
		//console.log(name);
		//users[name].emit("sendMsg", data);
		//socket.broadcast.to(name).emit('sendMsg', data);		
		
		socket.broadcast.emit("sendMsg", data);
	});
  socket.on('disconnect', function () {
    console.log('user disconnected');
  });
  
  
	function checkIfUserExists(userId) {
	  return users.some((user) => Object.keys(user).indexOf(userId) > -1)
	}  
});