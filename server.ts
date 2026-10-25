import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Modality } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '25mb' }));

  // API Routes
  app.post('/api/ai/chat', async (req, res) => {
    try {
      const { message, context } = req.body;
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: `You are Pranaam Care's compassionate 24/7 AI Care Coordinator & Health Advisor supporting elderly parents in India and their children abroad. Keep responses warm, respectful, practical, and empathetic. 
Current context: ${JSON.stringify(context || {})}
User message: ${message}`
              }
            ]
          }
        ],
        config: {
          systemInstruction: "You are an expert bilingual eldercare assistant for Pranaam Care. Always respond with empathy, accurate guidance regarding Indian healthcare (Apollo, Max, Fortis, pharmacies, senior care services), and include both English and Hindi warmth if appropriate."
        }
      });
      res.json({ reply: response.text || "Namaste! I am here to help you with anything you need." });
    } catch (err: any) {
      console.error('Gemini chat error:', err);
      res.status(500).json({ error: err.message || 'AI service error' });
    }
  });

  app.post('/api/ai/parse-prescription', async (req, res) => {
    try {
      const { prescriptionText } = req.body;
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: `Analyze this prescription note or medicine list and return a structured JSON with medicines (name, dosage, timing, frequency) and doctor instructions: "${prescriptionText}"`,
        config: {
          responseMimeType: 'application/json',
          systemInstruction: "Extract medical prescription details into structured JSON."
        }
      });
      res.json({ result: response.text });
    } catch (err: any) {
      console.error('Prescription parse error:', err);
      res.status(500).json({ error: err.message });
    }
  });

  // Video Generation endpoint using gemini-omni-1.1-flash via Interactions API
  app.post('/api/ai/generate-video', async (req, res) => {
    try {
      const { prompt, imageData, mimeType, aspectRatio } = req.body;
      const inputParts: any[] = [];
      if (imageData) {
        inputParts.push({
          type: 'image',
          mime_type: mimeType || 'image/jpeg',
          data: imageData,
        });
      }
      inputParts.push({
        type: 'text',
        text: prompt || 'Gentle cinematic motion bringing this photo of our parents to life with warm lighting.',
      });

      const interaction = await ai.interactions.create({
        model: 'gemini-omni-1.1-flash',
        input: inputParts,
        background: false,
        store: false,
        stream: false,
        response_format: {
          type: 'video',
          aspect_ratio: aspectRatio || '16:9',
          duration: '5s',
          resolution: '720p',
        },
      }, { timeout: 300000 });

      const videoPart = interaction.output_video;
      if (videoPart && videoPart.data) {
        res.json({ videoBase64: videoPart.data, mimeType: videoPart.mime_type || 'video/mp4' });
      } else {
        res.status(500).json({ error: 'Video generation completed but no video data returned.' });
      }
    } catch (err: any) {
      console.error('Video generation error:', err);
      res.status(500).json({ error: err.message || 'Video generation failed' });
    }
  });

  // Music Generation endpoint using lyria-3-clip-preview
  app.post('/api/ai/generate-music', async (req, res) => {
    try {
      const { prompt, model = 'lyria-3-clip-preview' } = req.body;
      const responseStream = await ai.models.generateContentStream({
        model,
        contents: prompt || 'Calming ambient sitar and soothing flute melody for senior relaxation.',
        config: {
          responseModalities: [Modality.AUDIO],
        },
      });

      let audioBase64 = '';
      let lyrics = '';
      let mimeType = 'audio/wav';

      for await (const chunk of responseStream) {
        const parts = chunk.candidates?.[0]?.content?.parts;
        if (!parts) continue;
        for (const part of parts) {
          if (part.inlineData?.data) {
            if (!audioBase64 && part.inlineData.mimeType) {
              mimeType = part.inlineData.mimeType;
            }
            audioBase64 += part.inlineData.data;
          }
          if (part.text && !lyrics) {
            lyrics = part.text;
          }
        }
      }

      if (audioBase64) {
        res.json({ audioBase64, mimeType, lyrics });
      } else {
        res.status(500).json({ error: 'Music generation returned no audio.' });
      }
    } catch (err: any) {
      console.error('Music generation error:', err);
      res.status(500).json({ error: err.message || 'Music generation failed' });
    }
  });

  // Vite middleware for development
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });

  app.use(vite.middlewares);

  const port = Number(process.env.PORT) || 3000;
  app.listen(port, '0.0.0.0', () => {
    console.log(`Pranaam Care server running on http://localhost:${port}`);
  });
}

startServer();
