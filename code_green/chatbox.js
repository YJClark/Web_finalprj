document.addEventListener('DOMContentLoaded', () => {
    const chatWindow = document.getElementById('chat-window');
    const output = document.getElementById('output');
    const message = document.getElementById('message');
    const sendButton = document.getElementById('send');

    // Function to load messages from LocalStorage
    function loadMessages() {
        const messages = JSON.parse(localStorage.getItem('chatMessages')) || [];
        output.innerHTML = '';
        messages.forEach(msg => {
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('message');
            messageDiv.classList.add(msg.user); // 使用者類型，sender或receiver
            messageDiv.style.font = '14px Andale Mono, monospace';
            messageDiv.textContent = msg.message;
            output.appendChild(messageDiv);
        });
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }

    // Function to save message to LocalStorage
    function saveMessage(messageContent, userType) {
        const messages = JSON.parse(localStorage.getItem('chatMessages')) || [];
        messages.push({ message: messageContent, user: userType });
        localStorage.setItem('chatMessages', JSON.stringify(messages));
    }

    // Event listener for send button
    sendButton.addEventListener('click', () => {
        const msg = message.value.trim();
        if (msg) {
            saveMessage(msg, user);
            loadMessages();
            message.value = '';
        }
    });

    // Load messages initially
    loadMessages();

    // Listen for storage events to update messages in real-time
    window.addEventListener('storage', loadMessages);
});
