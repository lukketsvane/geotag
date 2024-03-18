// Assuming this is a Next.js API route or similar serverless function setup
import { Configuration, OpenAIApi } from 'openai';

// Ensure OPENAI_API_KEY is set in your environment variables
const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
}));

// This function is meant to be used in a serverless environment where 'req' is the incoming request
// and 'res' is the server's response. Modify accordingly if your environment differs.
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { location, coordinates } = req.body; // Assuming JSON body

    const prompt = `Tell me a fun fact about ${location} (${coordinates.lat}, ${coordinates.lng}).`;

    const response = await openai.createCompletion({
      model: 'text-davinci-003', // Adjust model as necessary
      prompt: prompt,
      temperature: 0.7,
      max_tokens: 150,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });

    // Assuming the response from OpenAI's API includes the fun fact directly
    const funFact = response.data.choices[0].text.trim();

    // Responding with the fun fact
    res.status(200).json({ funFact });
  } catch (error) {
    console.error('Failed to generate fun fact:', error);
    res.status(500).json({ error: 'Failed to generate fun fact' });
  }
}
