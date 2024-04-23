const chatBox = document.getElementById('chat-box');
const messageInput = document.getElementById('message');

function sendMessage() {
  const message = messageInput.value.trim();
  if (message !== '') {
    appendMessage('You', message);
    messageInput.value = '';
  }
}

function appendMessage(sender, message) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message');
  messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
  chatBox.appendChild(messageElement);
  chatBox.scrollTop = chatBox.scrollHeight;
}
