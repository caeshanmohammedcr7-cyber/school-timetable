const OpenAI = require('openai');
const apiKey = process.env.OPEN_API_KEY;
if (!apiKey || apiKey.trim() === '') {
  throw new Error(
    'Missing OpenAI API key. Please set the OPEN_API_KEY environment variable.' + 'before starting the server.'
  );
}
let openaiClient;
try {
  openaiClient = new OpenAI({
    apiKey,
});
} catch (error) {
    throw new Error(`Failed to initialize OpenAI client: ${error.message}`);
}
module.exports = openaiClient;