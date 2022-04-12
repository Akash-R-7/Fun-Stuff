const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const {generateMessage, generateLocationMessage} = require('./utils/message');
const{isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;


var app = express();
var server = http.createServer(app); //Creating server
var io = socketIO(server);           //Web socket server(how we are gonna communicate bw server and client)
var users = new Users();

app.use(express.static(publicPath)); // Setting middleware

io.on('connection', (socket)=>{            //listens to a single socket from client
      console.log('New user connected');     // listen to an event & do something(registering an event from client)
     
      // socket.emit('newMessage',{
      // 	from : 'kashish@gadhi.com',
      // 	text : 'Hi kesa hai?',
      // 	createdAt : '17:34 PM'
      // });
     

      socket.on('join', (params, callback)=>{                           //validating room and name
        if(!isRealString(params.name) || !isRealString(params.room))
        	return callback("Enter valid name and room");
          socket.join(params.room);                                     // creating room 
          users.removeUser(socket.id);                                  // ensuring no user with same id exists
          users.addUser(socket.id, params.name, params.room);           //adding user                          
          io.to(params.room).emit('updatedUserList', users.getUserList(params.room)); //emitting userlist to client
           socket.emit('newMessage', generateMessage('Admin', 'Welcome to our chat app'));  //targetting in a specific room
           socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`)); // broadcasting in a room
        	callback();
      });

      socket.on('createMessage', function(message, callback){
         console.log('Message received',message);
         var user = users.getUser(socket.id);
         if(user && isRealString(message.text)){
            io.to(user.room).emit('newMessage',generateMessage(user.name, message.text)); 	//emit the message to every single user including the one sending it);
         }             
         callback();

         // socket.broadcast.emit('newMessage', {  //broadcasting the message barring the one sending it
         // 	from : message.from,
         // 	text : message.text,
         // 	createdAt : new Date().getTime()
         // });                       
      });

      socket.on('createLocationMessage', (coords)=>{
      	var user = users.getUser(socket.id);
      	io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
      });

      socket.on('disconnect', ()=> {
      console.log('User got disconnected');
      var removedUser = users.removeUser(socket.id);
      if(removedUser){
      io.to(removedUser.room).emit('updatedUserList', users.getUserList(removedUser.room));  //removing user
      io.to(removedUser.room).emit('newMessage', generateMessage('Admin', `${removedUser.name} has left`)); 
  }
  });
});                                  

server.listen(port, ()=>{            
	console.log(`App is running on port ${port}`);
});
