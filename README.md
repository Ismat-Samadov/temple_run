# Intelligent Healthcare Chatbot

A Next.js-based healthcare chatbot that provides health information and guidance to users. This chatbot can answer basic healthcare questions and provide general information about common health issues.

## Features

- Interactive chat interface
- User authentication (sign up, sign in, profile management)
- Personalized responses for logged-in users
- Chat history retention for authenticated users
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
   git clone https://github.com/yourusername/intelligent-healthcare.git
   cd intelligent-healthcare
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create an `.env.local` file in the root directory and add your environment variables:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   JWT_SECRET=your_jwt_secret_key_here
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
├── public/               # Static assets
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── api/          # API routes
│   │   │   ├── auth/     # Authentication endpoints
│   │   │   └── chat/     # Chat endpoint
│   │   ├── auth/         # Auth-related pages
│   │   │   ├── signin/   # Sign in page
│   │   │   └── signup/   # Sign up page
│   │   ├── profile/      # User profile page
│   │   ├── page.tsx      # Home page with chat interface
│   │   └── layout.tsx    # Root layout
│   ├── components/       # React components
│   │   ├── auth/         # Authentication components
│   │   ├── ChatInterface.tsx # Chat UI component
│   │   ├── ChatMessage.tsx   # Individual message component
│   │   └── Navbar.tsx    # Navigation component
│   ├── context/          # React context
│   │   └── AuthContext.tsx # Authentication context
│   ├── lib/              # Utility functions
│   │   ├── chatbot.ts    # Chatbot logic
│   │   ├── jwt.ts        # JWT utilities
│   │   └── user-db.ts    # User database simulation
│   ├── middleware.ts     # Next.js middleware for auth protection
│   └── types/            # TypeScript type definitions
│       ├── chat.ts       # Chat-related types
│       └── user.ts       # User-related types
├── .env.local            # Environment variables (create this file)
└── package.json
```

## Authentication System

The application uses a JWT-based authentication system:

- **Sign Up**: Users can create a new account with name, email, and password
- **Sign In**: Existing users can sign in with email and password
- **Protected Routes**: The middleware automatically protects certain routes that require authentication
- **User Profile**: Authenticated users have access to their profile information
- **Token Storage**: Authentication tokens are stored in localStorage and sent with API requests

## Chat Features

- **Anonymous Chat**: Users can chat without signing up
- **Personalized Chat**: Signed-in users get personalized responses
- **Chat History**: The system maintains conversation history for authenticated users
- **AI Integration**: Uses OpenAI's API for advanced responses when built-in knowledge is insufficient

## Extending the Chatbot

### Adding More Health Topics

To add more built-in responses to common health queries, edit the `healthcareKnowledgeBase` object in `src/lib/chatbot.ts`:

```typescript
const healthcareKnowledgeBase = {
  // Existing topics...
  'new-topic': 'Your response about the new health topic here.',
};
```

### Customizing the Authentication System

The authentication system is currently using in-memory storage for demonstration purposes. For a production application, you should:

1. Replace the in-memory user storage in `src/lib/user-db.ts` with a real database (e.g., MongoDB, PostgreSQL)
2. Add more security features like email verification, password reset, etc.
3. Implement more robust JWT handling with refresh tokens

### Customizing the UI

The chat interface and authentication forms can be customized by editing the components in the `src/components` directory. The application uses Tailwind CSS for styling.

## Disclaimer

This healthcare chatbot is intended for informational purposes only and should not be used as a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.

## License

This project is licensed under the MIT License - see the LICENSE file for details.