const socket = io();

let message = "O baby doll mai sone di";
let userid = 'gybuyg787GHYU7hgj';
let time = 'Tue Feb 25 2025 18:05:18 GMT+0530 (India Standard Time)';
let msg_type = 'user connected';



const emitToServer = () => {

};

document.getElementById('chat-form').addEventListener('submit', (event) => {
    event.preventDefault();
    message = document.getElementById('msg');
    if(message.value) {
        console.log(message.value);
        socket.emit('chat message',message.value);
        message.value = '';
    }
});

socket.on('message from server', (msg) => {
    console.log('Message from server ::' + msg);
})

