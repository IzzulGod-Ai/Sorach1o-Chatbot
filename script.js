        // Configuration
        async function getAPIKey() {
    const response = await fetch('/.netlify/functions/getApiKey');
    const data = await response.json();
    return data.API_KEY;
}
        const MODEL = "deepseek/deepseek-chat:free";
        const API_URL = "https://openrouter.ai/api/v1/chat/completions";
        
        // DOM Elements
        const chatContainer = document.getElementById('chatContainer');
        const welcomeScreen = document.getElementById('welcomeScreen');
        const messageInput = document.getElementById('messageInput');
        const sendBtn = document.getElementById('sendBtn');
        const menuBtn = document.getElementById('menuBtn');
        const sidebar = document.querySelector('.sidebar');
        const overlay = document.querySelector('.overlay');
        const closeSidebarBtn = document.querySelector('.close-sidebar');
        const newChatBtn = document.querySelector('.new-chat-btn');
        const chatHistory = document.getElementById('chatHistory');
    document.addEventListener('DOMContentLoaded', function() {
    initApp();
    customizeAvatars('images/user-avatar.png', 'images/ai-avatar.png');
});
        
        // App State
        let currentChatId = null;
        let conversations = {};
        let isProcessing = false;
        
        // Initialize app
        function initApp() {
            loadConversations();
            setupEventListeners();
            autoResizeTextarea();
        }
        
        // Load conversations from localStorage
        function loadConversations() {
            const savedConversations = localStorage.getItem('conversations');
            if (savedConversations) {
                conversations = JSON.parse(savedConversations);
                renderChatHistory();
            }
        }
        
        // Save conversations to localStorage
        function saveConversations() {
            localStorage.setItem('conversations', JSON.stringify(conversations));
            renderChatHistory();
        }
        
        // Setup event listeners
        function setupEventListeners() {
            // Send message on button click
            sendBtn.addEventListener('click', handleSendMessage);
            
            // Send message on Enter key (but allow Shift+Enter for new line)
            messageInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                }
            });
            
            // Toggle sidebar
            menuBtn.addEventListener('click', toggleSidebar);
            closeSidebarBtn.addEventListener('click', toggleSidebar);
            overlay.addEventListener('click', toggleSidebar);
            
            // Create new chat
            newChatBtn.addEventListener('click', createNewChat);
        }
        
        // Auto resize textarea based on content
        function autoResizeTextarea() {
            messageInput.addEventListener('input', function() {
                this.style.height = 'auto';
                this.style.height = (this.scrollHeight) + 'px';
            });
        }
        
        // Toggle sidebar
        function toggleSidebar() {
            sidebar.classList.toggle('open');
            overlay.classList.toggle('active');
        }
        
        // Create a new chat
        function createNewChat() {
            currentChatId = generateId();
            conversations[currentChatId] = {
                id: currentChatId,
                title: 'New Chat',
                messages: []
            };
            
            saveConversations();
            renderChat();
            
            if (sidebar.classList.contains('open')) {
                toggleSidebar();
            }
            
            // Focus on input
            messageInput.focus();
        }
        
        // Load a chat
        function loadChat(chatId) {
            currentChatId = chatId;
            renderChat();
            
            if (sidebar.classList.contains('open')) {
                toggleSidebar();
            }
        }
        
        // Delete a chat
        function deleteChat(chatId, event) {
            event.stopPropagation();
            
            if (confirm('Are you sure you want to delete this chat?')) {
                delete conversations[chatId];
                saveConversations();
                
                if (currentChatId === chatId) {
                    currentChatId = null;
                    renderChat();
                }
            }
        }
        
        // Render chat history
        function renderChatHistory() {
            chatHistory.innerHTML = '';
            
            Object.values(conversations).forEach(chat => {
                const historyItem = document.createElement('div');
                historyItem.className = 'history-item';
                historyItem.innerHTML = `
                    <div class="history-title">${chat.title}</div>
                    <div class="delete-chat">
                        <i class="fas fa-trash"></i>
                    </div>
                `;
                
                historyItem.addEventListener('click', () => loadChat(chat.id));
                historyItem.querySelector('.delete-chat').addEventListener('click', (e) => deleteChat(chat.id, e));
                
                chatHistory.appendChild(historyItem);
            });
        }
        
        // Render current chat
        function renderChat() {
            chatContainer.innerHTML = '';
            
            if (!currentChatId) {
                chatContainer.appendChild(welcomeScreen);
                return;
            }
            
            welcomeScreen.remove();
            
            const chat = conversations[currentChatId];
            if (!chat) return;
            
            chat.messages.forEach(msg => {
                addMessageToUI(msg.role, msg.content);
            });
            
            // Scroll to bottom
            scrollToBottom();
        }
        
        // Handle send message
        async function handleSendMessage() {
            const message = messageInput.value.trim();
            if (!message || isProcessing) return;
            
            // Clear input and reset height
            messageInput.value = '';
            messageInput.style.height = 'auto';
            
            // Create new chat if none exists
            if (!currentChatId) {
                createNewChat();
            }
            
            // Add user message to UI and conversation
            addMessageToUI('user', message);
            
            const chat = conversations[currentChatId];
            chat.messages.push({
                role: 'user',
                content: message
            });
            
            // Update chat title if it's the first message
            if (chat.messages.length === 1) {
                chat.title = message.substring(0, 30);
                if (message.length > 30) chat.title += '...';
                saveConversations();
            } else {
                saveConversations();
            }
            
            // Add typing indicator
            const typingIndicator = document.createElement('div');
            typingIndicator.className = 'chat-message';
            typingIndicator.innerHTML = `
                <div class="message-ai">
                    <div class="message-header">
                        <img src="images/ai-avatar.png" alt="AI" class="avatar" id="aiAvatar">
                        <strong>Sorach1o</strong>
                    </div>
                    <div class="typing-indicator">
                        <span class="typing-dot"></span>
                        <span class="typing-dot"></span>
                        <span class="typing-dot"></span>
                    </div>
                </div>
            `;
            chatContainer.appendChild(typingIndicator);
            scrollToBottom();
            
            // Process AI response
            isProcessing = true;
            try {
                const response = await getAIResponse(chat.messages);
                
                // Remove typing indicator
                chatContainer.removeChild(typingIndicator);
                
                // Add AI response to UI and conversation
                addMessageToUI('assistant', response);
                chat.messages.push({
                    role: 'assistant',
                    content: response
                });
                
                saveConversations();
            } catch (error) {
                console.error('Error getting AI response:', error);
                
                // Remove typing indicator
                chatContainer.removeChild(typingIndicator);
                
                // Show error message
                addMessageToUI('assistant', 'Sorry, I encountered an error. Please try again later.');
            } finally {
                isProcessing = false;
                scrollToBottom();
            }
        }
        
        // Add message to UI
        function addMessageToUI(role, content) {
            const messageDiv = document.createElement('div');
            messageDiv.className = 'chat-message';
            
            if (role === 'user') {
                messageDiv.innerHTML = `
                    <div class="message-user">
                        <div class="message-header">
                            <img src="images/user-avatar.png" alt="User" class="avatar" id="userAvatar">
                            <strong>You</strong>
                        </div>
                        <div class="message-content">${content}</div>
                    </div>
                `;
            } else {
                // Process markdown for AI messages
                const markedContent = marked.parse(content);
                
                messageDiv.innerHTML = `
                    <div class="message-ai">
                        <div class="message-header">
                            <img src="images/ai-avatar.png" alt="AI" class="avatar" id="aiAvatar">
                            <strong>Sorach1o</strong>
                        </div>
                        <div class="message-content markdown-body">${markedContent}</div>
                    </div>
                `;
            }
            
            chatContainer.appendChild(messageDiv);
            
            // Apply syntax highlighting to code blocks
            messageDiv.querySelectorAll('pre code').forEach((block) => {
                hljs.highlightElement(block);
            });
            
            // Render KaTeX
            renderMathInElement(messageDiv, {
                delimiters: [
                    {left: '$$', right: '$$', display: true},
                    {left: '$', right: '$', display: false},
                    {left: '\\(', right: '\\)', display: false},
                    {left: '\\[', right: '\\]', display: true}
                ],
                throwOnError: false
            });
            
            scrollToBottom();
        }
        
        // Get AI response from API
        async function getAIResponse(messages) {
            const formattedMessages = [
    {
        role: "system",
        content: "Kamu adalah Sorach1o, asisten AI yang diciptakan dan disempurnakan oleh Izzul God menggunakan model LLM Open Source DeepSeek V3 yang membantu pengguna dengan informasi dan percakapan yang ramah."
    },
    ...messages.map(msg => ({
        role: msg.role,
        content: msg.content
    }))
];
            
            const API_KEY = await getAPIKey();

const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
    },
    body: JSON.stringify({
        model: MODEL,
        messages: formattedMessages,
        temperature: 0.7,
        max_tokens: 2000
    })
});
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.error?.message || 'Failed to get response');
            }
            
            return data.choices[0].message.content;
        }
        
        // Scroll chat to bottom
        function scrollToBottom() {
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
        
        // Generate a random ID
        function generateId() {
            return Math.random().toString(36).substring(2, 15);
        }
        
        // Initialize the app
        document.addEventListener('DOMContentLoaded', initApp);
        
        // Custom logo and avatar setup
        // You can replace these placeholder functions with your actual implementation
        function customizeLogo(logoUrl) {
            const mainLogo = document.getElementById('mainLogo');
            const headerLogo = document.getElementById('headerLogo');
            
            if (mainLogo) mainLogo.src = logoUrl;
            if (headerLogo) headerLogo.src = logoUrl;
        }
        
        function customizeAvatars(userAvatarUrl, aiAvatarUrl) {
            const userAvatars = document.querySelectorAll('#userAvatar');
            const aiAvatars = document.querySelectorAll('#aiAvatar');
            
            userAvatars.forEach(avatar => {
                avatar.src = userAvatarUrl;
            });
            
            aiAvatars.forEach(avatar => {
                avatar.src = aiAvatarUrl;
            });
        }
        
     customizeAvatars('images/user-avatar.png', 'images/ai-avatar.png');

