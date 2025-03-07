// initialising libraries {npm install socket.io express}

// initialising express app
const express = require('express');
const app = express();

// Acquiring built-in http library : Contains protocols for GET and POST methods over internet
const http = require('http');

// Create server using express app{will be handled by express}
const server = http.createServer(app);

// Acquire Server class from socket.io for real time full duplex communication
const { Server } = require('socket.io');

// Create an instance of Server class and pass the server to it
// to setup socket.io to work with the server allowing it to handle websocket connections
const io = new Server(server);

// express allows import statements from public package :
// resolves MIME type errors 
app.use(express.static('public'));

// Create a route that listens to the root URL '/' and sends a response
app.get('/', (request, response) => {
    response.sendFile(__dirname + '/index.html');
});

// Setups event listener for Server, connection event is emmited whenever a new client connects to the server
io.on('connection', (socket) => {
    const username = socket.handshake.query.username;
    console.log(`User connected :: ${username}`);

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });

    socket.on('chat message', (msg) => {
        console.log('message from user :: ', msg);
        io.emit('message from server', msg);
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
    console.log('http://localhost:3000');
});