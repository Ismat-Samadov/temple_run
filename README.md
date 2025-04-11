# Intelligent Healthcare Chatbot

A Next.js-based healthcare chatbot that provides health information and guidance to users. This chatbot can answer basic healthcare questions and provide general information about common health issues.

## Features

- Interactive chat interface
- Built-in responses for common health queries
- Integration capability with OpenAI for advanced responses
- Responsive design for all devices
- Clear health disclaimers

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ismat-samadov/intelligent-healthcare.git
   cd intelligent-healthcare
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create an `.env.local` file in the root directory and add your OpenAI API key:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
intelligent-healthcare/
├── public/
├── src/
│   ├── app/                # Next.js App Router
│   │   ├── api/            # API routes
│   │   │   └── chat/       # Chat endpoint
│   │   ├── page.tsx        # Home page with chat interface
│   │   └── layout.tsx      # Root layout
│   ├── components/         # React components
│   │   ├── ChatInterface.tsx  # Chat UI component
│   │   └── ChatMessage.tsx    # Individual message component
│   ├── types/              # TypeScript type definitions
│   │   └── chat.ts
│   └── lib/                # Utility functions
│       └── chatbot.ts      # Chatbot logic
├── .env.local              # Environment variables (create this file)
└── package.json
```

## Extending the Chatbot

### Adding More Health Topics

To add more built-in responses to common health queries, edit the `healthcareKnowledgeBase` object in `src/lib/chatbot.ts`:

```typescript
const healthcareKnowledgeBase = {
  // Existing topics...
  'new-topic': 'Your response about the new health topic here.',
};
```

### Customizing the UI

The chat interface can be customized by editing the components in the `src/components` directory. The application uses Tailwind CSS for styling.

## Disclaimer

This healthcare chatbot is intended for informational purposes only and should not be used as a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.

## License

This project is licensed under the MIT License - see the LICENSE file for details.