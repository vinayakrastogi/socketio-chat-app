let socket;
let username;
let message;
let time;
let msg_type; // user connected // user disconnected // chat message

// chat message format

const generateMessage = (message, username, time, msg_type) => {
    return JSON.stringify({
        message,
        username,
        time,
        msg_type
    });
};

const handleChatSubmit = (event) => {
    event.preventDefault();
    let message = document.getElementById('msg');
    if (message.value) {
        socket.emit('chat message', generateMessage(message.value, username, new Date(), 'user_message'));
        message.value = '';
    }
};


// socker format

const initializeSocket = (username) => {
    socket = io({
        query: {
            username: username
        }
    }); // Connect to the server

    socket.emit('User connected', username);

    socket.on('message from server', (msg) => {
        console.log('Message from server ::' + msg);
        const messagesElement = document.querySelector('.messages');
        if (messagesElement) {
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('message');
            messageDiv.innerHTML = `<p class="text">${msg}</p>`;
            messagesElement.appendChild(messageDiv);
        }
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
    const usernameInput = document.getElementById('login-username');
    if (usernameInput.value) {
        username = usernameInput.value;
        initializeSocket(username);
        usernameInput.value = '';
        document.querySelector('.login-container').style.display = 'none';
        document.querySelector('.chat-container').style.display = 'block';
    }
});

document.getElementById('logout-button').addEventListener('click', logoutUser);
document.getElementById('chat-form').addEventListener('submit', handleChatSubmit);