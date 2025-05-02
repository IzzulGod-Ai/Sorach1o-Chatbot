# Sorach1o - AI Chatbot

Sorach1o is a sophisticated web-based chatbot application that leverages the OpenRouter API to deliver intelligent, contextually relevant responses. Built with modern web technologies and hosted on Netlify, this application offers a seamless conversational AI experience while maintaining security best practices through serverless functions.

## Key Features

- **Intelligent Conversation Engine**: Engage with a powerful AI chatbot powered by state-of-the-art language models via OpenRouter API
- **Comprehensive Conversation Management**:
  - Create new chat sessions instantly with the "New Chat" button
  - Access and navigate through your conversation history via the intuitive sidebar
  - Delete unnecessary conversations to maintain a clean interface
- **Enterprise-Grade Security**: API credentials securely stored using Netlify's serverless functions architecture
- **Responsive Design**: Optimized user experience across all devices - from desktop workstations to mobile phones

## Technology Stack

| Component | Technologies |
|-----------|-------------|
| Frontend | HTML5, CSS3, JavaScript (ES6+) |
| Backend | Netlify Functions (Serverless) |
| AI Integration | OpenRouter API |
| Deployment | Netlify Continuous Deployment |

## Local Development Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/IzzulGod/Sorach1o-Chatbot.git
   ```

2. Navigate to the project directory:
   ```bash
   cd reponame
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Install Netlify CLI (if not already installed):
   ```bash
   npm install -g netlify-cli
   ```

5. Create a local environment configuration:
   ```bash
   # Create .env file in the root directory
   echo "OPENROUTER_API_KEY=your_api_key_here" > .env
   ```

6. Start the development server:
   ```bash
   netlify dev
   ```

7. Access the application at `http://localhost:8888`

## Deployment Configuration

### Environment Variables

For production deployment, configure the following environment variables in your Netlify dashboard:

1. Navigate to Site settings > Build & deploy > Environment
2. Add the required variable:
   - `OPENROUTER_API_KEY`: Your OpenRouter API authentication key

### Deployment Steps

1. Connect your GitHub repository to Netlify
2. Configure build settings:
   - Build command: `npm run build` (if applicable)
   - Publish directory: `dist` or your output directory
3. Deploy the site

## Live Demo

Experience Sorach1o in action: [https://sorachio.netlify.app](https://sorachio.netlify.app)

## Screenshots

*(Consider adding screenshots of your application here)*

## Roadmap

- [ ] Implement user authentication system
- [ ] Add support for additional AI models
- [ ] Develop conversation export functionality
- [ ] Enhance UI with customizable themes

## Contributing

Contributions are welcome and appreciated. To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the [MIT License](https://choosealicense.com/licenses/mit/) - see the LICENSE file for details.

---

Developed by [Izzul God] | [Your Website/GitHub Profile](https://github.com/yourusername)
