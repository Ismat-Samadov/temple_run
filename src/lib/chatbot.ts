import OpenAI from 'openai';
import { findUserById } from './user-db';

// Initialize OpenAI client
// Note: You should use environment variables for the API key in production
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '', // Add your API key to .env.local
});

// Basic healthcare knowledge base for simple queries
const healthcareKnowledgeBase = {
  'headache': 'Headaches can be caused by stress, dehydration, lack of sleep, or more serious conditions. For occasional headaches, rest, hydration, and over-the-counter pain relievers may help. If headaches are severe or persistent, please consult a healthcare provider.',
  'cold': 'Common cold symptoms include runny nose, sore throat, cough, and mild fever. Rest, fluids, and over-the-counter cold medicines can help manage symptoms. If symptoms worsen or persist beyond 10 days, consider consulting a healthcare provider.',
  'fever': 'Fever is often a sign that your body is fighting an infection. Rest, hydration, and over-the-counter fever reducers may help. For high fevers (above 103°F/39.4°C) or fevers that persist for more than three days, please seek medical attention.',
  'diabetes': 'Diabetes is a chronic condition that affects how your body processes blood sugar. Common symptoms include increased thirst, frequent urination, and fatigue. Management typically involves monitoring blood sugar, medication, healthy eating, and regular exercise. Always consult healthcare providers for proper diagnosis and treatment.',
  'blood pressure': 'Blood pressure measurements include systolic (top number) and diastolic (bottom number) pressures. Normal is generally considered below 120/80 mmHg. Lifestyle changes like regular exercise, healthy diet, limiting sodium, and reducing stress can help manage blood pressure.',
};

// In-memory storage for user conversation history (in a real app, use a database)
const userConversationHistory: Record<string, Array<{role: string, content: string}>> = {};

/**
 * Process a healthcare-related query and return a response
 */
export async function processHealthcareQuery(query: string, userId?: string | null): Promise<string> {
  // Convert query to lowercase for matching
  const lowerQuery = query.toLowerCase();
  
  // Get or initialize user conversation history
  let conversationHistory: Array<{role: string, content: string}> = [];
  if (userId) {
    if (!userConversationHistory[userId]) {
      userConversationHistory[userId] = [];
    }
    conversationHistory = userConversationHistory[userId];
  }
  
  // Check if query matches any keywords in our knowledge base
  for (const [keyword, response] of Object.entries(healthcareKnowledgeBase)) {
    if (lowerQuery.includes(keyword)) {
      // Add this interaction to conversation history if user is logged in
      if (userId) {
        conversationHistory.push({ role: "user", content: query });
        conversationHistory.push({ role: "assistant", content: response });
        // Keep conversation history to a reasonable size
        if (conversationHistory.length > 20) {
          conversationHistory.splice(0, 2); // Remove oldest exchange
        }
      }
      return response;
    }
  }
  
  try {
    // If no match in knowledge base, use AI to generate a response
    if (process.env.OPENAI_API_KEY) {
      // Get user information if available
      let userName = '';
      if (userId) {
        const user = await findUserById(userId);
        if (user) {
          userName = user.name;
        }
      }
      
      // Create messages array starting with the system prompt
      const messages = [
        {
          role: "system",
          content: `You are a helpful healthcare assistant. Provide informative but cautious health information, always encouraging proper medical consultation for serious concerns. Never diagnose or prescribe. Include appropriate disclaimers when necessary.${userName ? ` You are talking to ${userName}.` : ''}`
        }
      ];
      
      // Add conversation history if available
      if (conversationHistory.length > 0) {
        messages.push(...conversationHistory);
      }
      
      // Add the current query
      messages.push({ role: "user", content: query });
      
      // Generate a response
      const completion = await openai.chat.completions.create({
        messages,
        model: "gpt-3.5-turbo",
        temperature: 0.7,
        max_tokens: 500,
      });
      
      const aiResponse = completion.choices[0].message.content || fallbackResponse();
      
      // Add this interaction to conversation history if user is logged in
      if (userId) {
        conversationHistory.push({ role: "user", content: query });
        conversationHistory.push({ role: "assistant", content: aiResponse });
        // Keep conversation history to a reasonable size
        if (conversationHistory.length > 20) {
          conversationHistory.splice(0, 2); // Remove oldest exchange
        }
      }
      
      return aiResponse;
    } else {
      // If no API key is configured, use the fallback response
      return fallbackResponse();
    }
  } catch (error) {
    console.error('OpenAI API error:', error);
    return fallbackResponse();
  }
}

/**
 * Fallback response when AI is unavailable
 */
function fallbackResponse(): string {
  return "I'm sorry, I don't have specific information about that health topic. For accurate medical advice, please consult with a healthcare professional. Would you like to ask about another health topic?";
}