let socket;
let username;
let message;
let time;
let msg_type; // user connected // user disconnected // chat message

/*
 *   Function : display_message
 *   Purpose : Prints a specific message based on provided parameter n
 *   Parameters :
 *           n - choice of pre-defined message
 *   Returns: void
*/


const messageObject = {
    message: '',
    username: '',
    time: '',
    msg_type: '',

    generateMessage: function() {
        return JSON.stringify({
            message: this.message,
            username: this.username,
            time: this.time,
            msg_type: this.msg_type
        });
    },

    parseMessage: function(jsonString) {
        const parsed = JSON.parse(jsonString);
        this.message = parsed.message;
        this.username = parsed.username;
        this.time = parsed.time;
        this.msg_type = parsed.msg_type;
    }
};

// Sender Side
const handleChatSubmit = (event) => {
    event.preventDefault();
    let message = document.getElementById('msg');
    if (message.value) {
        const newMessageObject = Object.create(messageObject);
        newMessageObject.message = message.value;
        newMessageObject.username = username;
        newMessageObject.time = new Date();
        newMessageObject.msg_type = 'user_message';
        socket.emit('chat message', newMessageObject.generateMessage());
        message.value = '';
    }
};


// Receiver Side
const handleMessageFromServer = (msg) => {
    const messagesElement = document.querySelector('.messages');
    if (messagesElement) {

        const newMessageObject = Object.create(messageObject);
        newMessageObject.parseMessage(msg);
        
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.innerHTML = `<p class="text">${newMessageObject.message}</p>`;
        messagesElement.appendChild(messageDiv);
    }
};

const initializeSocket = (username) => {
    socket = io({
        query: {
            username: username
        }
    }); // Connect to the server

    socket.emit('User connected', username);

    socket.on('message from server', handleMessageFromServer);
};

const logoutUser = () => {
    if (socket) {
        socket.emit('user disconnected', username);
        socket.disconnect();
    }
    document.querySelector('.chat-container').style.display = 'none';
    document.querySelector('.login-container').style.display = 'block';
};

const handleLoginSubmit = (event) => {
    event.preventDefault();
    const usernameInput = document.getElementById('login-username');
    if (usernameInput.value) {
        username = usernameInput.value;
        initializeSocket(username);
        usernameInput.value = '';
        document.querySelector('.login-container').style.display = 'none';
        document.querySelector('.chat-container').style.display = 'block';
    }
};



// Event listeners
document.getElementById('login-form').addEventListener('submit', handleLoginSubmit);
document.getElementById('logout-button').addEventListener('click', logoutUser);
document.getElementById('chat-form').addEventListener('submit', handleChatSubmit);