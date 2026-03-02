import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Test loading prompt config
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

// Test
const prompt = getSystemPrompt();
if (prompt.includes('Noël Jumin') && prompt.includes('Data Scientist')) {
  console.log('✅ Backend config loaded successfully');
  console.log('✅ Prompt contains expected data');
  console.log(`✅ Current date in prompt: ${new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}`);
  console.log('\n📝 Prompt preview (first 200 chars):');
  console.log(prompt.substring(0, 200) + '...');
} else {
  console.log('❌ Backend config issue');
}
