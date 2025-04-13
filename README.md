# Intelligent Healthcare Chatbot

A Next.js-based healthcare chatbot application that provides health information and guidance to users. This chatbot can answer questions about common health issues, provide general medical information, and guide users toward appropriate healthcare resources.

## 🌟 Features

- **Modern Tech Stack**: Built with Next.js 15, React 19, TypeScript, and Tailwind CSS
- **Interactive Chat Interface**: Real-time conversation with intelligent health assistant
- **Role-Based Access**: Separate interfaces for patients and healthcare providers
- **Personalized Responses**: Tailored answers based on user context and history
- **User Authentication System**: Complete signup, signin, and profile management
- **PostgreSQL Database Integration**: Secure storage of user data and chat history
- **OpenAI Integration**: Advanced responses for complex health queries
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- **Health Information Database**: Built-in responses for common health topics
- **Privacy-Focused**: Clear disclaimers and secure handling of sensitive information
- **JWT Authentication**: Secure token-based authentication system
- **Protected Routes**: Middleware-based route protection
- **Animated UI Components**: Modern, visually appealing interface

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn
- PostgreSQL database

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ismat-samadov/intelligent_healthcare.git
   cd intelligent-healthcare
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create an `.env.local` file in the root directory with the following variables:
   ```
   # PostgreSQL Database Configuration
   DB_HOST=your_db_host
   DB_PORT=5432
   DB_NAME=your_db_name
   DB_USER=your_db_username
   DB_PASSWORD=your_db_password
   
   # JWT Secret (Generate a strong random string)
   JWT_SECRET=your_jwt_secret_key_here
   
   # OpenAI API Key (Optional, but recommended for advanced responses)
   OPENAI_API_KEY=your_openai_api_key_here
   ```

4. Initialize the database:
   ```bash
   npm run db:init
   # or
   yarn db:init
   ```

5. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 🏗️ Project Structure

```
intelligent-healthcare/
├── public/                # Static assets (SVG icons)
├── src/
│   ├── app/               # Next.js App Router
│   │   ├── api/           # API routes
│   │   │   ├── auth/      # Authentication endpoints
│   │   │   └── chat/      # Chat endpoint
│   │   ├── auth/          # Auth-related pages
│   │   │   ├── signin/    # Sign in page
│   │   │   └── signup/    # Sign up page
│   │   ├── chat/          # Chat interface page
│   │   ├── doctor/        # Doctor-specific pages
│   │   │   └── dashboard/ # Doctor dashboard
│   │   ├── profile/       # User profile page
│   │   ├── privacy/       # Privacy policy page
│   │   ├── terms/         # Terms of service page
│   │   ├── page.tsx       # Home page
│   │   └── layout.tsx     # Root layout
│   ├── components/        # React components
│   │   ├── auth/          # Authentication components
│   │   │   ├── SignInForm.tsx
│   │   │   └── SignUpForm.tsx
│   │   ├── doctor/        # Doctor-specific components
│   │   │   └── DoctorDashboard.tsx
│   │   ├── ChatInterface.tsx   # Chat UI component
│   │   ├── ChatMessage.tsx     # Individual message component
│   │   ├── Navbar.tsx          # Navigation component
│   │   ├── PrivacyPolicy.tsx   # Privacy policy component
│   │   └── TermsOfService.tsx  # Terms of service component
│   ├── context/           # React context
│   │   └── AuthContext.tsx # Authentication context
│   ├── lib/               # Utility functions
│   │   ├── chatbot.ts     # Chatbot logic
│   │   ├── db.ts          # Database connection
│   │   ├── edge-jwt.ts    # Edge-compatible JWT utilities
│   │   ├── jwt.ts         # JWT utilities
│   │   └── user-db.ts     # User database operations
│   ├── middleware.ts      # Next.js middleware for auth protection
│   └── types/             # TypeScript type definitions
│       ├── chat.ts        # Chat-related types
│       └── user.ts        # User-related types
├── scripts/               # Utility scripts
│   └── scripts.sql        # Database initialization SQL
├── .env.local             # Environment variables (create this file)
└── package.json
```

## 🔐 Authentication System

The application uses a JWT-based authentication system:

- **Sign Up**: Users can create a new account with name, email, password, and role (patient or doctor)
- **Sign In**: Existing users can sign in with email and password
- **Protected Routes**: Middleware automatically protects routes that require authentication
- **Role-Based Access**: Doctor-specific routes are protected from regular users
- **User Profile**: Authenticated users can access their profile information
- **Token Storage**: Authentication tokens are stored in both localStorage and cookies
- **JWT Verification**: Server-side verification of tokens for protected routes

## 💬 Chat Features

- **Healthcare Knowledge Base**: Built-in responses for common health topics
- **Context-Aware Suggestions**: Dynamically updated chat suggestions based on conversation
- **Conversation History**: For authenticated users, chat history is maintained
- **Personalized Responses**: Users who are logged in receive personalized interactions
- **OpenAI Integration**: Advanced AI responses when built-in knowledge is insufficient
- **Health Disclaimers**: Clear healthcare disclaimers to ensure proper use

## 🧠 AI Integration

The chatbot uses a combination of:

1. **Built-in Knowledge Base**: For fast responses to common health questions
2. **OpenAI API**: For more complex or nuanced health inquiries
3. **Personalization Layer**: Adapts responses based on user context and history

## 💽 Database Integration

The application uses PostgreSQL for data storage:

- **User Management**: Securely stores user information with encrypted passwords
- **Role-Based System**: Distinguishes between patients and healthcare providers
- **Chat History**: Logs conversation history for authenticated users
- **Connection Pool**: Efficient connection management for database operations

## 🚑 Healthcare Provider Features

For users with the "doctor" role:

- **Doctor Dashboard**: Overview of patient statistics and activities
- **Provider Portal**: Centralized access to healthcare provider tools
- **Role-Based UI**: Special navigation options and features

## ✏️ Extending the Chatbot

### Adding More Health Topics

To add more built-in responses to common health queries, edit the `healthcareKnowledgeBase` object in `src/lib/chatbot.ts`:

```typescript
const healthcareKnowledgeBase = {
  // Existing topics...
  'new-topic': 'Your response about the new health topic here.',
};
```

### Customizing the Authentication System

To implement a production-ready authentication system:

1. Connect to a production PostgreSQL database by updating environment variables
2. Implement additional security features like email verification, password reset
3. Configure session timeouts and refresh token rotation

### Customizing the UI

The chat interface and authentication forms can be customized by editing the components in the `src/components` directory. The application uses Tailwind CSS for styling.

## ⚠️ Health Information Disclaimer

This healthcare chatbot is intended for informational purposes only and should not be used as a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.