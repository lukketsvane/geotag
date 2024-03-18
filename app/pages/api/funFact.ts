import { OpenAIStream, StreamingTextResponse } from 'ai';
import { OpenAIApi, Configuration } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export const runtime = 'edge';

export async function POST(req: Request) {
  const { location, coordinates } = await req.json();

  try {
    const prompt = `Tell me a fun fact about ${location} (${coordinates.lat}, ${coordinates.lng}).`;

    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      stream: true,
    });

    const stream = OpenAIStream(response);
    const reader = stream.getReader();
    const decoder = new TextDecoder();
    let funFact = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value);
      funFact += chunk;
    }

    return new Response(JSON.stringify({ funFact }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Failed to generate fun fact:', error);
    return new Response(JSON.stringify({ error: 'Failed to generate fun fact' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}