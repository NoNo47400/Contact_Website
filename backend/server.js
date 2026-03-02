import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Mistral } from '@mistralai/mistralai';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Mistral client
const mistral = new Mistral({
  apiKey: process.env.MISTRAL_API_KEY,
});

// Load prompt configuration from JSON
const loadPromptConfig = () => {
  try {
    const configPath = join(__dirname, 'data', 'prompt-config.json');
    const configData = readFileSync(configPath, 'utf-8');
    return JSON.parse(configData);
  } catch (error) {
    console.error('Error loading prompt configuration:', error);
    return null;
  }
};

// Function to generate system prompt with current date
const getSystemPrompt = () => {
  const config = loadPromptConfig();
  if (!config || !config.systemPromptTemplate) {
    return "Tu es l'assistant personnel de Noël Jumin.";
  }

  const now = new Date();
  const dateStr = now.toLocaleDateString('fr-FR', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  
  return config.systemPromptTemplate.replace('{{currentDate}}', dateStr);
};

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    // Create message history for Mistral with dynamic date
    const chatMessages = [
      {
        role: 'system',
        content: getSystemPrompt(),
      },
      ...messages.map(msg => ({
        role: msg.role,
        content: msg.content,
      })),
    ];

    // Call Mistral API
    const response = await mistral.chat.complete({
      model: 'mistral-large-latest',
      messages: chatMessages,
      temperature: 0.7,
      maxTokens: 1024,
    });

    // Extract the response content
    const assistantMessage = response.choices[0].message.content;

    res.json({
      success: true,
      message: assistantMessage,
    });
  } catch (error) {
    console.error('Error calling Mistral API:', error);
    res.status(500).json({
      error: 'Failed to generate response',
      details: error.message,
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`✅ Backend server running on http://0.0.0.0:${port}`);
});
