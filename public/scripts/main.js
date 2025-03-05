let socket;
let username = 'Rahul';
let message = "O baby doll mai sone di";
let userid = 'gybuyg787GHYU7hgj';
let time = 'Tue Feb 25 2025 18:05:18 GMT+0530 (India Standard Time)';
let msg_type = 'user connected';

const emitToServer = () => {
    // Your emit logic here
};

document.getElementById('chat-form').addEventListener('submit', (event) => {
    event.preventDefault();
    message = document.getElementById('msg');
    if (message.value) {
        console.log(message.value);
        socket.emit('chat message', message.value);
        message.value = '';
    }
});

const initializeSocket = (username) => {
    socket = io({
        query: {
            username: username
        }
    }); // Connect to the server
    socket.emit('user connected', username);
    socket.on('message from server', (msg) => {
        console.log('Message from server ::' + msg);
    });
};

const logoutUser = () => {
    if (socket) {
        socket.emit('user disconnected', username);
        socket.disconnect();
    }
    document.querySelector('.chat-container').style.display = 'none';
    document.querySelector('.login-container').style.display = 'block';
};

document.getElementById('login-form').addEventListener('submit', (event) => {
    event.preventDefault();
    username = document.getElementById('login-username');
    if (username.value) {
        console.log(username.value);
        initializeSocket(username.value);
        username.value = '';
        document.querySelector('.login-container').style.display = 'none';
        document.querySelector('.chat-container').style.display = 'block';
    }
});

document.getElementById('logout-button').addEventListener('click', logoutUser);