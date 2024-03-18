// app/pages/api/getFunFact.js
import { Configuration, OpenAIApi } from 'openai-edge';

export default async function handler(req, res) {
  const { lat, lng, name } = req.query;
  const prompt = `Tell me a fun fact about ${name} located at latitude ${lat} and longitude ${lng}.`;

  const openai = new OpenAIApi(new Configuration({ apiKey: process.env.OPENAI_API_KEY }));
  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: "system", content: `Latitude: ${lat}, Longitude: ${lng}, Name: ${name}`}, {role: "user", content: prompt}],
      stream: false,
    });
    const funFact = response.choices[0]?.message?.content.trim();
    res.status(200).json({ funFact });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch fun fact' });
  }
}
