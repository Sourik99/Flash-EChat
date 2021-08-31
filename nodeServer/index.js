const io = require('socket.io')(3000, {
    cors: {
      origin: '*',
    }
  });

const users = {};

io.on('connection', (socket) =>{
    socket.on('new-user-joined', names =>{
        // console.log("New user",names)
        users[socket.id] = names;
        socket.broadcast.emit('user-joined', names);
    })
    socket.on('send' , message =>{
        socket.broadcast.emit('receive', {message: message , names: users[socket.id]})
    });
    socket.on('disconnect' , message =>{
        socket.broadcast.emit('leave' , users[socket.id])
        delete users[socket.id];
    });
})