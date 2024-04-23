const peer = new Peer(); // Create a new Peer instance
let conn = null;

peer.on('open', (id) => {
    console.log('My peer ID is: ' + id);
});

peer.on('connection', (connection) => {
    console.log('Connected to: ' + connection.peer);
    conn = connection;
    conn.on('data', (data) => {
        displayMessage(data, 'received');
    });
});

function sendMessage() {
    const messageInput = document.getElementById('message-input');
    const message = messageInput.value;
    if (!conn) {
        console.log('No peer connection');
        return;
    }
    conn.send(message);
    displayMessage(message, 'sent');
    messageInput.value = '';
}

function displayMessage(message, type) {
    const messagesDiv = document.getElementById('messages');
    const messageElement = document.createElement('div');
    messageElement.className = 'message ' + type;
    messageElement.innerText = message;
    messagesDiv.appendChild(messageElement);
}
