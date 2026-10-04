import express from 'express';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(express.json());

// API Route: Kinetic Scientific Intelligence with Google Search Grounding
app.post('/api/kinetic-search-grounding', async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'GEMINI_API_KEY is not set in environment.' });
    }

    const ai = new GoogleGenAI({ apiKey });

    // Use gemini-3.5-flash with googleSearch tool per user specification
    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        systemInstruction: `You are the Kinetic Research & Science Engine for Protein X.
Provide up-to-date, authoritative, evidence-based sports science answers on protein synthesis, micro-filtration vs ion exchange, creatine saturation, hydration osmolarity, and WADA 2026 compliance.
Use real Google Search information to answer with current data, clinical trial findings, and direct facts.
Keep the style kinetic, direct, high-energy, and scientifically precise without filler pleasantries.`,
      },
    });

    const text = response.text || '';
    const candidate = response.candidates?.[0];
    const groundingMetadata = candidate?.groundingMetadata;

    return res.json({
      text,
      groundingMetadata: groundingMetadata || null,
    });
  } catch (error: any) {
    console.error('Error in search grounding endpoint:', error);
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
});

async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static('dist'));
    app.get('*', (req, res) => {
      res.sendFile('dist/index.html', { root: '.' });
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true, hmr: process.env.DISABLE_HMR !== 'true' },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Kinetic Server listening on port ${port}`);
  });
}

startServer();
