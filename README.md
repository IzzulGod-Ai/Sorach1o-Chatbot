# Sorachio - AI Assistant

<div align="center">
  <img src="images/20250509_062745.png" alt="Sorachio Logo" width="500">
</div>


Sorachio is a responsive web-based AI assistant that leverages the DeepSeek Chat model through OpenRouter's API. It provides an intuitive chat interface similar to popular AI assistants while maintaining conversation history and context.

## ✨ Features

- **Modern & Responsive UI**: Works seamlessly across desktop and mobile devices
- **Conversation Memory**: Remembers chat context and previous conversations
- **Markdown Support**: Full markdown rendering including code syntax highlighting
- **Mathematical Notation**: LaTeX math rendering with KaTeX
- **Chat History Management**: Save, access, and delete past conversations
- **Smart Conversation Summarization**: Automatically summarizes long conversations for better context awareness
- **Memory Management**: Efficiently handles large conversations to stay within token limits

## 🔧 Technologies Used

- **Frontend**: HTML, CSS, JavaScript (Vanilla)
- **API Integration**: OpenRouter API with DeepSeek Chat model
- **Code Highlighting**: highlight.js
- **Markdown Parsing**: marked.js
- **Math Rendering**: KaTeX
- **Icons**: Font Awesome

## 📱 Responsive Design

Sorachio is designed to work beautifully on all devices:
- Desktop-optimized layout
- Mobile-responsive interface
- Virtual keyboard handling for mobile devices
- Smooth scrolling and animations

## 💬 Conversation Features

- Real-time typing indicators
- Message history with user/AI avatars
- Code syntax highlighting
- Math equation rendering
- Auto-expanding text input
- Local storage for conversation persistence

## 🚀 Getting Started

### Prerequisites

- API key from [OpenRouter](https://openrouter.ai/)
- Basic Netlify account for serverless functions (optional)

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/IzzulGod/Sorachio-WebChat.git
   cd Sorachio-WebChat
   ```

2. Configure your API key:
   - For local development, create a `.env` file with your OpenRouter API key
   - For production, set up environment variables in your hosting provider

3. Deploy to your hosting provider of choice (Netlify recommended for serverless function support)

## 🔒 API Key Management

The application uses a serverless function to securely manage the API key. This keeps your API key hidden from client-side code.

## 📦 Project Structure

```
sorachio/
├── images/            # Logo and avatar images
├── index.html         # Main HTML structure
├── styles.css         # Styling for all components
├── script.js          # Core application logic
└── netlify/functions/ # Serverless functions for API key management
```

## 🛠️ Customization

You can easily customize Sorachio by:

1. Changing the logo and avatars:
   ```javascript
   customizeLogo('path/to/your/logo.png');
   customizeAvatars('path/to/user/avatar.png', 'path/to/ai/avatar.png');
   ```

2. Modifying the system prompt:
   ```javascript
   // In script.js
   contextMessages.push({
     role: "system",
     content: "Your custom system prompt here..."
   });
   ```

3. Adjusting the theme colors in CSS variables:
   ```css
   :root {
     --accent-color: #your-brand-color;
     /* other variables */
   }
   ```

## 📄 License

This project is available as open source under the terms of the MIT License.

##  Acknowledgements

- [OpenRouter](https://openrouter.ai/) for API access
- [DeepSeek](https://www.deepseek.com/) for the language model
- [highlight.js](https://highlightjs.org/) for code syntax highlighting
- [marked.js](https://marked.js.org/) for markdown parsing
- [KaTeX](https://katex.org/) for math rendering
- [Font Awesome](https://fontawesome.com/) for icons
