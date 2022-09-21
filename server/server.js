const { Server } = require("socket.io")

const io = new Server(3000, { 
    cors: {
        origin: "*"
    }
 });

io.on("connection", (socket) => {
  console.log("connected " + socket.id)
  socket.on('send-room-name', (room_name) => {
    socket.join(room_name)
    socket.emit('verify-room', true)
  })

  socket.on('leave-room', (room_name) => {
    socket.leave(room_name)
  })
  
  socket.on('send-message', (message, room_name, nickname) => {
    socket.to(room_name).emit("receive-message", message, nickname)
  })

  socket.on("disconnect", (reason) => {
    console.log(socket.id + " disconnected for " + reason)
  });
});
////yghjgyhjguy